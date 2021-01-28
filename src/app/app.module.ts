import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MainPageComponent } from './components/home/main-page/main-page.component';
import { CostCalculationComponent } from './components/home/cost-calculation/cost-calculation.component';
import { CostResultComponent } from './components/home/cost-result/cost-result.component';
import { AlternativeOptionsComponent } from './components/home/alternative-options/alternative-options.component';
import { FooterPageComponent } from './components/home/footer-page/footer-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainPageComponent,
    CostCalculationComponent,
    CostResultComponent,
    AlternativeOptionsComponent,
    FooterPageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
