import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksItem } from './tasks-item';

describe('TasksItem', () => {
  let component: TasksItem;
  let fixture: ComponentFixture<TasksItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksItem],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
