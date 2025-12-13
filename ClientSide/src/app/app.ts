import { Component, signal } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { Header } from "./components/partials/header/header";
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Loading } from "./components/partials/loading/loading";

@Component({
  selector: 'app-root',
  imports: [
    Header,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    Loading
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ClientSide');
}
