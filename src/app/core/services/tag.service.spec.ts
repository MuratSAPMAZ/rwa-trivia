import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { AngularFire } from 'angularfire2';
import { TagService } from './tag.service';

describe('TagService', () => {
  let tagList: string[] = ["C++", "Swift", "Ionic", "Azure", "AWS"];
  let afDbMock = { "database": {
                    list: () => Observable.of(tagList.map(t => {return {"$value": t}})) } 
                  };

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TagService,
      {"provide": AngularFire, "useValue": afDbMock}
    ]
  }));

  it('Call getTags to return Observable of Tags',
    inject([
      TagService
    ],
    (service: TagService) => {

      let tagsObs = service.getTags();

      tagsObs.subscribe(tags => {
        expect(tags.length).toEqual(tagList.length);
        expect(tags[0]).toEqual(tagList[0]);
      });
    })
  );

});