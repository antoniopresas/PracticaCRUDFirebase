import { HeroesService } from './../../services/heroes.service';
import { HeroeModel } from './../../models/heroes.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor(
    private heroeService: HeroesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo'){

      this.heroeService.getHeroe(id)
          .subscribe( (resp: HeroeModel) => {
            this.heroe = resp;
            this.heroe.id = id;
          });
    }

  }

  guardar ( form: NgForm) {

    if (form.invalid) {

      console.log('Formulario no válido');

      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if ( this.heroe.id ) {

      this.heroeService.actualizarHeroe(this.heroe)
          .subscribe(resp => {

            Swal.fire({
              title: this.heroe.nombre,
              text: 'Se actualizó correctamente',
              icon: 'success'
            });

          });

    } else {

      this.heroeService.crearHeroe(this.heroe)
          .subscribe( resp => {

        Swal.fire({
          title: this.heroe.nombre,
          text: 'Creado correctamente',
          icon: 'success'
        });

      });

    }

  }

}
