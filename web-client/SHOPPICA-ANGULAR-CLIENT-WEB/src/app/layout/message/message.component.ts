import { SignalrService } from './../../core/services/signalr/signalr.service';
import { Customer } from './../../core/model/user/customer';
import { ShareService } from './../../core/services/share/share.service';
import { MessageRequest } from './../../core/model/message/message-request';
import { JwtService } from '@core/services/jwt/jwt.service';
import { filter } from 'rxjs/operators';
import { Conversation } from './../../core/model/message/conversation';
import { Component, OnInit, ElementRef, ViewChild, Renderer2, AfterViewInit, AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Message } from '@core/model/message/message';
import { MessageService } from '@core/services/message/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent implements OnInit {
  isShowMessagesFrame = false;
  accountId: number = -1;
  content: string;
  customer: Customer;
  numMessageUnRead: number;
  conversationSelected: Conversation;
  conversations: Conversation[] = [];
  messages: Message[] = [];
  @ViewChild('messageContent', { static: true }) messageContent: ElementRef;
  @ViewChild('audioElement', { static: true }) private audioElement;


  constructor(
    private readonly messageService: MessageService,
    private readonly jwtService: JwtService,
    private readonly shareService: ShareService,
    private readonly renderer: Renderer2,
    private readonly signalrService: SignalrService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.startSignalr();

    this.accountId = this.jwtService.getAccountId();

    this.getConversations();
    this.receiveMessage();
    this.getCustomerInfo();

    this.messageService.conversationEmitted$.subscribe(conversation => {
      const existConversations = this.conversations.filter(x => x.id === conversation.id);
      if (existConversations.length == 0) {
        this.conversations.unshift(conversation);
        this.conversationSelected = conversation;
      }
      else {
        this.conversationSelected = existConversations[0];
      }
      this.openConversation(this.conversationSelected);
      this.isShowMessagesFrame = true;

    })
  }

  startSignalr() {
    this.signalrService.buildChatConnection();
    this.signalrService.startChatConnection();
    this.signalrService.addReceiveMessageDataListener();
  }

  getCustomerInfo() {
    this.shareService.customerInfoEmitted$.subscribe(customer => {
      if (customer) {
        this.customer = customer;
      }
    });
  }

  receiveMessage() {
    this.signalrService.messageEventEmitter$.subscribe(conversation => {
      if (conversation.id == this.conversationSelected.id) {
        this.messages.push(conversation.lastMessage);
      }

      const index = this.conversations.findIndex(x => x.id == conversation.id);
      if (index !== -1) {
        this.conversations[index].lastMessage = conversation.lastMessage;

        this.conversations = [
          this.conversations[index],
          ...this.conversations.filter(x => x.id !== conversation.id)
        ]
      }
      else {
        this.conversations.unshift(conversation);
      }

      this.calculateMessageUnRead();
      this.changeDetector.detectChanges();
      this.scrollToBottom();
      this.playNotifySound();
    })
  }

  getConversations() {

    this.messageService.getAllConversations(this.accountId).subscribe(res => {
      if (res.isSuccess) {
        this.conversations = res.data;
        if (this.conversations.length > 0) {
          this.conversationSelected = this.conversations[0];
          this.openConversation(this.conversationSelected);
          this.changeDetector.detectChanges();
        }
      }
    })
  }

  calculateMessageUnRead() {
    this.numMessageUnRead = this.conversations.filter(x => x.lastMessage && x.lastMessage.sender_id != this.accountId && !x.lastMessage.isRead).length;
  }

  openConversation(conversation: Conversation) {
    this.messageService.getMessageByConversation(conversation?.id).subscribe(res => {
      if (res.isSuccess) {
        this.messages = res.data;
        this.changeDetector.detectChanges();
        this.scrollToBottom();
      }
    })

    this.conversationSelected = {
      ...conversation
    };

    if (this.conversationSelected.lastMessage) {
      this.messageService.readMessage(conversation.id).subscribe(res => {
        this.conversationSelected.lastMessage.isRead = true;
        this.calculateMessageUnRead();
        this.changeDetector.detectChanges();
      });
    }

  }

  sendMessage() {
    if (!this.content) {
      return;
    }
    const messageRequest: MessageRequest = {
      content: this.content,
      senderImage: this.customer?.image,
      senderName: this.customer?.customerName,
      conversation_id: this.conversationSelected.id,
      sender_id: this.accountId,
      receive_id: this.conversationSelected.receive_id
    }

    this.messageService.sendMessage(messageRequest).subscribe(res => {
      if (res.isSuccess) {
        const message = {
          id: res.data,
          content: this.content,
          created_at: new Date(),
          sender_id: this.accountId,
          isRead: true
        };
        this.messages.push(message)

        this.content = "";

        const index = this.conversations.findIndex(x => x.id == this.conversationSelected.id);
        this.conversations[index].lastMessage = message;
        this.conversations = [
          this.conversations[index],
          ...this.conversations.filter(x => x.id !== this.conversationSelected.id)
        ]
        this.changeDetector.detectChanges();
        this.scrollToBottom();
      }

    })
  }

  scrollToBottom(): void {
    this.messageContent.nativeElement.scrollTop = this.messageContent.nativeElement.scrollHeight;
  }


  playNotifySound() {
    this.audioElement.nativeElement.insertAdjacentHTML("beforeend", "<audio autoplay><source src='assets/musics/notification.mp3'></audio>")
    setTimeout(() => {
      const childElements = this.audioElement.nativeElement.childNodes;
      for (let child of childElements) {
        this.renderer.removeChild(this.audioElement.nativeElement, child);
      }
    }, 1000)
  }
}
