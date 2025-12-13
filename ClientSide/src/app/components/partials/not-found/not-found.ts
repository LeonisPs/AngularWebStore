import { Component, Input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ButtonDirective } from "primeng/button";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, ButtonDirective,ButtonModule],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound {
  @Input()
  visible = false;
  @Input()
  notFoundMessage = "Nothing Found";
  @Input()
  resetLinkText = "Reset";
  @Input()
  resetLinkRoute = "/";

}
