import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AppStore } from './store/app.store';
@NgModule({
  imports: [NgxsModule.forRoot([AppStore])],
})
export class AppModule {}
