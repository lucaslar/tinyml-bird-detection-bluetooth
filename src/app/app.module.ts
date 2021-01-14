import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ErrorService } from './services/error.service';
import { MaterialModule } from './modules/material.module';
import { ErrorDialogComponent } from './components/dialogs/error-dialog/error-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { LanguageSelectionComponent } from './components/dialogs/language-selection/language-selection.component';
import { EllipsisTooltipDirective } from './directives/ellipsis-tooltip.directive';
import { MainContentComponent } from './components/main-content/main-content.component';
import { AppRoutingModule } from './app-routing.module';
import { InfoSlidesComponent } from './components/dialogs/info-slides/info-slides.component';
import { SwiperModule } from 'swiper/angular';

/**
 * Function to be used as factory for loading internationalization files.
 * @param http Http Client.
 */
const HttpLoaderFactory = (http: HttpClient) => {
    return new TranslateHttpLoader(
        http,
        './assets/i18n/translations/',
        '.json'
    );
};

/**
 * Central module of this application in which components are declared, other modules are imported etc.
 */
@NgModule({
    declarations: [
        AppComponent,
        ErrorDialogComponent,
        HeaderComponent,
        LanguageSelectionComponent,
        EllipsisTooltipDirective,
        MainContentComponent,
        InfoSlidesComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        MaterialModule,
        SwiperModule,
    ],
    providers: [
        {
            provide: ErrorHandler,
            useClass: ErrorService,
        },
    ],

    bootstrap: [AppComponent],
})
export class AppModule {}
