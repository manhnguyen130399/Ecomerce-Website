import { Attachment } from './../../core/model/message/attachment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile, NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { environment } from '@env';
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
import { Observable, Observer } from 'rxjs';
import { fileMineTypes } from '@core/model/file-type';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent implements OnInit {
  uploadUrl = `${environment.productServiceUrl}/api/upload`;
  isShowMessagesFrame = false;
  accountId: number = -1;
  content: string;
  customer: Customer;
  isLoad = true;
  numMessageUnRead: number;
  conversationSelected: Conversation;
  conversations: Conversation[] = [];
  messages: Message[] = [];
  fileList: NzUploadFile[] = [];
  @ViewChild('messageContent') messageContent: ElementRef;
  @ViewChild('audioElement', { static: true }) private audioElement;


  constructor(
    private readonly messageService: MessageService,
    private readonly jwtService: JwtService,
    private readonly shareService: ShareService,
    private readonly renderer: Renderer2,
    private readonly signalrService: SignalrService,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly nzMessageService: NzMessageService
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
        console.log(res.data);

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
    const attachments: Attachment[] = [];
    if ((this.content === undefined || this.content === '') && this.fileList.length === 0) {
      return;
    }

    if (!this.isLoad) {
      return;
    }

    this.fileList.forEach(file => {
      const fileType = fileMineTypes.filter(x => x.mimeType.includes(file.type));
      if (fileType[0]?.name == 'IMAGE') {
        attachments.push({
          thumbUrl: file.response?.data[0]
        })
      }
      else {
        attachments.push({
          fileUrl: file.response?.data[0],
          name: file.name
        })
      }
    })


    const messageRequest: MessageRequest = {
      content: this.content,
      senderImage: this.customer?.image,
      senderName: this.customer?.customerName,
      conversation_id: this.conversationSelected.id,
      sender_id: this.accountId,
      receive_id: this.conversationSelected.receive_id,
      attachments: attachments
    }

    this.messageService.sendMessage(messageRequest).subscribe(res => {
      if (res.isSuccess) {
        const message = {
          id: res.data,
          content: this.content,
          created_at: new Date(),
          sender_id: this.accountId,
          isRead: true,
          attachments: attachments
        };
        this.messages.push(message)

        this.content = "";
        this.fileList = [];
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

  removeAttachment(id: string) {
    this.fileList = this.fileList.filter(x => x.uid !== id);
  }

  handleChange = (info: NzUploadChangeParam) => {
    this.isLoad = false;
    if (info.type == 'success') {
      this.isLoad = true;
    }
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    return new Observable((observer: Observer<boolean>) => {
      const isSmall2M = file.size! / 1024 / 1024 < 1;
      if (!isSmall2M) {
        this.nzMessageService.error('File must smaller than 1MB!');
        observer.complete();
        return;
      }
      const fileType = fileMineTypes.filter(x => x.mimeType.includes(file.type));
      file.color = fileType.length > 0 ? fileType[0].colorCode : fileMineTypes[0].colorCode;
      file.extension = file.name.split('.').pop().toLocaleUpperCase();
      file.newSize = file.size / 1024 < 1 ? `${file.size} B` : `${Math.round(file.size / 1024)} KB`;
      observer.next(isSmall2M);
      observer.complete();
    });
  };

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
