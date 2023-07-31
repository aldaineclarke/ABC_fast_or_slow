import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameModule } from './modules/game/game.module';
import { SocketIoModule } from 'ngx-socket-io';
import { SharedModule } from './modules/shared/shared.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GameModule,
    SocketIoModule.forRoot({
      url: 'http://localhost:6060', //server url -- should be updated to match server
      options: {
        transports: ['websocket'],
      },
    }),
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
