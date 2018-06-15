import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Dish } from '../../shared/dish';

import { FavouriteProvider } from '../../providers/favourite/favourite';

/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {

	dish: Dish;
	errMess: string;
	avgstars: string;
	numcomments: number;
	favourite: boolean;

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				@Inject ('BaseURL') private BaseURL,
				private toastCtrl: ToastController,
				private favouriteservice: FavouriteProvider) {

		this.dish = navParams.get('dish');
		this.favourite = favouriteservice.isFavourite(this.dish.id);
		this.numcomments = this.dish.comments.length;

		let total = 0;
		this.dish.comments.forEach(comment => total += comment.rating);
		this.avgstars = (total/this.numcomments).toFixed(2);

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad DishdetailPage');
	}

	addToFavorites() {
	    console.log('Adding to Favorites', this.dish.id);
	    this.favourite = this.favouriteservice.addFavourite(this.dish.id);
		this.toastCtrl.create({
			message: 'Dish ' + this.dish.id + ' added successfully',
			position: 'middle',
			duration: 3000
		}).present();
	}

}
