import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule) },
            { path: 'charts', loadChildren: () => import('./charts/charts.module').then((m) => m.ChartsModule) },
            { path: 'tables', loadChildren: () => import('./tables/tables.module').then((m) => m.TablesModule) },
            {
                path: 'warga',
                loadChildren: () => import('./warga/warga.module').then((m) => m.WargaModule)
            },
            {
                path: 'propinsi',
                loadChildren: () => import('./master/propinsi/propinsi.module').then((m) => m.PropinsiModule)
            },
            {
                path: 'kabkota',
                loadChildren: () => import('./master/kabkota/kabkota.module').then((m) => m.KabkotaModule)
            },
            {
                path: 'desa',
                loadChildren: () => import('./master/desa/desa.module').then((m) => m.DesaModule)
            },
            {
                path: 'kecamatan',
                loadChildren: () => import('./master/kecamatan/kecamatan.module').then((m) => m.KecamatanModule)
            },
            {
                path: 'rw',
                loadChildren: () => import('./master/rw/rw.module').then((m) => m.RWModule)
            },
            {
                path: 'rt',
                loadChildren: () => import('./master/rt/rt.module').then((m) => m.RTModule)
            },
            {
                path: 'tipes',
                loadChildren: () => import('./settings/tipes/tipes.module').then((m) => m.TipesModule)
            },
            {
                path: 'utils',
                loadChildren: () => import('./settings/utils/utils.module').then((m) => m.UtilsModule)
            },
            { path: 'forms', loadChildren: () => import('./form/form.module').then((m) => m.FormModule) },
            {
                path: 'bs-element',
                loadChildren: () => import('./bs-element/bs-element.module').then((m) => m.BsElementModule)
            },
            { path: 'grid', loadChildren: () => import('./grid/grid.module').then((m) => m.GridModule) },
            {
                path: 'components',
                loadChildren: () => import('./bs-component/bs-component.module').then((m) => m.BsComponentModule)
            },
            {
                path: 'blank-page',
                loadChildren: () => import('./blank-page/blank-page.module').then((m) => m.BlankPageModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
