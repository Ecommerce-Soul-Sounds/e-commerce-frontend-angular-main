import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {

    constructor(@Inject(DOCUMENT) public document: Document) { }

    ngOnInit(): void {
        
    }
}