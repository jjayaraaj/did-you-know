import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tag } from '../model/tag.model';
import { DykService } from '../services/dyk.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  tags: Tag[] = [];

  constructor(
    private _dykService: DykService,
    private router: Router
  ) { }

  ngOnInit() {
    this._dykService.getAllTags().subscribe((response) => {
      this.tags = response.tag;
    });
  }

  onClickTag(tag) {
    console.log(tag);
    this.router.navigate(['/', 'dyk', tag.id]);
  }

  onClickAll() {
    this.router.navigate(['/', 'dyk']);
  }

}
