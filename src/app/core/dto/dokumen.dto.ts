export class DokumenDto {
    id: string;
    tipe: string;

    url: string;

    wargaId: string;
    nomorKK: string;
    rt: number;
    nama: string;

    createdOn?: Date;
    createdBy: string;
    updatedOn?: Date;
    updatedBy: string;
    isDeleted: boolean;
}
