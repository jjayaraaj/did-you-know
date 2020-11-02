import { NgModule } from "@angular/core";
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from './footer/footer.component';


@NgModule({
    declarations: [HeaderComponent, FooterComponent],
    imports: [CommonModule, IonicModule],
    exports: [HeaderComponent, FooterComponent]
})

export class ComponentModule{

}