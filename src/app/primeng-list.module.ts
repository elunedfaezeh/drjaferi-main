import { NgModule } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { GalleriaModule } from 'primeng/galleria';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TabViewModule } from 'primeng/tabview';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ChipsModule } from 'primeng/chips';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { RatingModule } from 'primeng/rating';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenuModule } from 'primeng/menu';
// import {EditorModule} from 'primeng/editor';
import { AccordionModule } from 'primeng/accordion';
import { MenubarModule } from 'primeng/menubar';
import { TooltipModule } from 'primeng/tooltip';
// import { PrimeIcons } from 'primeng/api';
import { FieldsetModule } from 'primeng/fieldset';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';
import { GMapModule } from 'primeng/gmap';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DividerModule } from 'primeng/divider';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {BadgeModule} from 'primeng/badge';
import {SliderModule} from 'primeng/slider';
import {MegaMenuModule} from 'primeng/megamenu';
import {TabMenuModule} from 'primeng/tabmenu';
import {ChartModule} from 'primeng/chart';
import {InplaceModule} from 'primeng/inplace';
import {ListboxModule} from 'primeng/listbox';
import { MessagesModule } from 'primeng/messages';
import { SplitterModule } from 'primeng/splitter';
import { StepsModule } from 'primeng/steps';
import { AvatarModule } from 'primeng/avatar';
import { DataViewModule } from 'primeng/dataview';


let list = [
  MessageModule,
  InplaceModule,
  ListboxModule,
  SplitterModule,
  ChartModule,
  TabMenuModule,
  AvatarModule,
  StepsModule,
  MegaMenuModule,
  DataViewModule,
  AutoCompleteModule,
  SliderModule,
  ScrollPanelModule,
  BreadcrumbModule,
  FieldsetModule,
  GMapModule,
  InputSwitchModule,
  DividerModule,
  CalendarModule,
   BadgeModule,
   MessagesModule,
  //PrimeIcons,
  CardModule,
  CarouselModule,
  RatingModule,
  PanelModule,
  RadioButtonModule,
  TieredMenuModule,
  MenuModule,
  AccordionModule,
  MenubarModule,
  TooltipModule,
  PaginatorModule,
  SidebarModule,
  PanelMenuModule,
  DropdownModule,
  InputTextModule,
  InputNumberModule,
  ButtonModule,
  RippleModule,
  CheckboxModule,
  InputTextareaModule,
  GalleriaModule,
  PasswordModule,
  ToolbarModule,
  TagModule,
  ToastModule,
  DialogModule,
  KeyFilterModule,
  TabViewModule,
  FileUploadModule,
  InputMaskModule,
  TableModule,
  ConfirmDialogModule,
  DynamicDialogModule,
  // EditorModule,
  ChipsModule,
  SelectButtonModule,
  MultiSelectModule,
];
@NgModule({
  declarations: [],
  imports: list,
  exports: list,
})
export class PrimengListModule { }
