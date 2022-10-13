import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

interface aboutImage {
    imageSrc: string;
    imageAlt: string;
}

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    constructor(@Inject(DOCUMENT) public document: Document, private titleService: Title) {}

    ngOnInit(): void {
        this.titleService.setTitle("About us - Soul Sounds");
    }
}