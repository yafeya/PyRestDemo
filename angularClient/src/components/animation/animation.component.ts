import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition, AnimationBuilder } from '@angular/animations';

@Component({
    selector: 'animation-area',
    templateUrl: 'animation.component.html',
    styleUrls: ['animation.component.scss'],
    animations: [
        trigger('spin', [
            state('disabled', style({
                transform: 'rotate(0deg)'
            })),
            state('enabled', style({
                transform: 'rotate(360deg)'
            })),
            transition('disabled => enabled', animate('1000ms ease-in')),
            transition('enabled => disabled', animate('1000ms ease-out'))
        ])
    ]
})
export class AnimationComponent implements OnInit {

    private mRotateState: string = 'disabled';

    @ViewChild('img') img: ElementRef;

    private mPlayer: any;

    constructor(private animationBuilder: AnimationBuilder) {

    }

    ngOnInit(): void {

    }



    get RotateState(): string {
        return this.mRotateState;
    }

    set RotateState(value: string) {
        this.mRotateState = value;
    }

    start() {
        if (this.mPlayer != undefined && this.mPlayer.hasStarted()) {
            this.mPlayer.finish();
        }

        let animation = this.animationBuilder.build([
            style({
                transform: 'rotate(0deg)'
            }),
            animate(10000, style({
                transform: 'rotate(360deg)'
            }))
        ]);

        // use the returned factory object to create a player

        this.mPlayer = animation.create(this.img.nativeElement);
        this.RotateState = 'enabled';
        this.mPlayer.onDone(() => this.mPlayer.restart());
        this.mPlayer.play();
    }

    stop() {
        this.RotateState = 'disabled';
        this.mPlayer.pause();
    }

    changeState() {
        if (this.RotateState == 'disabled') {
            this.RotateState = 'enabled';
        }
        else {
            this.RotateState = 'disabled';
        }
    }
}