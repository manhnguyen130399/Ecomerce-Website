import { ProfileService } from '@modules/profile/services/profile.service';
import { SignalrService } from '@core/services/signalr/signalr.service';
import { UtilitiesService } from './../../core/services/utilities/utilities.service';
import { MessageRequest } from './../../core/models/message/message-request';
import { Component, OnInit, ElementRef, ViewChild, Renderer2, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Conversation } from '@app/core/models/message/conversation';
import { Message } from '@app/core/models/message/message';
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
  storeName: string;
  numMessageUnRead: number;
  conversationSelected: Conversation;
  conversations: Conversation[] = [];
  messages: Message[] = [];
  @ViewChild('messageContent') messageContent: ElementRef;
  @ViewChild('audioElement', { static: true }) private audioElement;

  constructor(
    private readonly messageService: MessageService,
    private readonly utilitiesService: UtilitiesService,
    private readonly signalrService: SignalrService,
    private readonly renderer: Renderer2,
    private readonly profileService: ProfileService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.accountId = this.utilitiesService.getAccountId();


    this.loadSellerInfo();
    this.getConversations();
    this.receiveMessage();

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

  loadSellerInfo() {
    const storeId = this.utilitiesService.getStoreId();
    this.profileService.getStoreDetail(storeId).subscribe(res => {
      if (res.code == "OK") {
        this.storeName = res.data.storeName;
      }
    })
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
      this.playNotifySound();
      this.changeDetector.detectChanges();
      this.scrollToBottom();
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
    const messageRequest: MessageRequest = {
      content: this.content,
      senderImage: this.utilitiesService.getImage(),
      senderName: this.storeName,
      conversation_id: this.conversationSelected?.id,
      sender_id: this.accountId,
      receive_id: this.conversationSelected?.receive_id
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
