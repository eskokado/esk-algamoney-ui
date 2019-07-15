import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { DashboardService } from './../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  pieChartData: any;

  lineChartData: any;

  options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const valor = dataset.data[tooltipItem.index];
          const label = dataset.label ? (dataset.label + ': ') : '';
          return label + this.decimalPipe.transform(valor, '1.2-2');
        }
      }
    }
  };

  constructor(
    private dashboardService: DashboardService,
    private decimalPipe: DecimalPipe
  ) { }

  ngOnInit() {
    this.configurarGraficoPizza();
    this.configurarGraficoLinha();
  }

  configurarGraficoPizza() {
    this.dashboardService.lancamentosPorCategoria()
      .then(dados => {
        this.pieChartData = {
          labels: dados.map(dado => dado.categoria.nome),
          datasets: [
            {
              data: dados.map(dado => dado.total),
              backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC',
                '#0099C6', '#DD4477', '#3366CC', '#DC3912']
            }
          ]
        };

      });
  }

  configurarGraficoLinha() {
    this.dashboardService.lancamentoPorDia()
      .then(dados => {
        const meses = this.configurarMeses();
        const totaisReceitas = this.totaisPorMes(dados.filter(dado => dado.tipo === 'RECEITA'), meses);
        const totaisDespesas = this.totaisPorMes(dados.filter(dado => dado.tipo === 'DESPESA'), meses);
        this.lineChartData ={
          labels: meses,
          datasets: [
            {
              label: 'Receitas',
              data: totaisReceitas,
              borderColor: '#3366CC'
            },
            {
              label: 'Despesas',
              data: totaisDespesas,
              borderColor: '#D62B00'
            }
          ]
        };
      });
  }

  private totaisPorDia(dados, diasDoMes) {
    const totais: number[] = [];
    for (const dia of diasDoMes) {
      let total = 0;

      for (const dado of dados) {
        if (dado.dia.getDate() === dia) {
          total += dado.total;

          //break;
        }
      }
      totais.push(total);
    }
    return totais;
  }

  private totaisPorMes(dados, meses) {
    const totais: number[] = [];
    for (const mes of meses) {
      let total = 0;

      for (const dado of dados) {
        if (dado.dia.getMonth() === mes) {
          total += dado.total;

          //break;
        }
      }
      totais.push(total);
    }
    return totais;
  }

  private configurarDiasMes() {
    const mesReferencia = new Date();
    mesReferencia.setMonth(mesReferencia.getMonth() + 1);
    mesReferencia.setDate(0);

    const quantidade = mesReferencia.getDate();

    const dias: number[] = [];

    for (let i = 1; i <= quantidade; i++) {
      dias.push(i);
    }
    return dias;
  }

  private configurarMeses() {
    const meses: number[] = [];
    for (let i = 1; i <= 12; i++) {
      meses.push(i);
    }
    return meses;
  }

}