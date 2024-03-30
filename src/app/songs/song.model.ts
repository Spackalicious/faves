export class Song {

    constructor(
        public id: string,
        public title: string,
        public artist: string,
        public ytLink: string,
        public comments?: string[]
    ) { }

}
