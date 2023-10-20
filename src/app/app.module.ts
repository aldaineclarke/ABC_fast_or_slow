import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameModule } from './modules/game/game.module';
import { SocketIoModule } from 'ngx-socket-io';
import { SharedModule } from './modules/shared/shared.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { httpInterceptorProviders } from './interceptors';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GameModule,
    SocketIoModule.forRoot({
      url: 'http://127.0.0.1:4040/gameroom', //server url -- should be updated to match server
      options: {
        transports: ['websocket'],
      },
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
