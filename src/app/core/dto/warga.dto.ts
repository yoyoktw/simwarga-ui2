export interface WargaDto {
    id?: string;
    idType?: string;
    nik: string;
    nama: string;
    email: string;
    rt: number;
    rw?: number;
    nomorKK: string;
    asalKTP?: string;
    jenisKelamin: number;
    tempatLahir: string;
    tanggalLahir?: string;
    agama: number;
    pendidikan: number;
    jenisPekerjaan: number;
    statusPerkawinan: number;
    hubunganKeluarga: number;
    kewarganegaraan: number;
    alamatTinggal: string;
    alamatKTP: string;
    statusWarga: number;
    keterangan?: string;
    noHP?: string;
    golDarah?: number;
    pernahCovid?: number;
    vaksinCovidKe1?: string;
    vaksinCovidKe2?: string;
    vaksinCovidKe3?: string;
    familyGroup?: string;
    isKK?: boolean;
}

export interface WargaParam {
    rt: number;
    rw: number;
}
