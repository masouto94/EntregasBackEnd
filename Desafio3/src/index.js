"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contenedor_1 = require("./Contenedor");
const manager = new Contenedor_1.Contenedor('./src/file.txt');
const cama = {
    title: "Cama King  Size",
    price: 45000,
    thumbnail: "https://www.pontofrio-imagens.com.br/Moveis/Colchoes/CamaBoxKing/1000068452/936323661/cama-box-king-size-colchao-italia-umaflex-com-molas-ensacadas-e-pillow-top-68x193x203cm-1000068452.jpg"
};
const auriculares_nac = {
    title: "Auriculares nacionales",
    price: 19000,
    thumbnail: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.zonaoutdoor.es%2Fsites%2Fdefault%2Ffiles%2Fauriculares_panasonic_rp_hd10ek.jpg&f=1&nofb=1"
};
const auriculares_import = {
    title: "Auriculares importados",
    price: 29000,
    thumbnail: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.qRAoeBj5nfA9GIHwOXWLwAHaHa%26pid%3DApi&f=1"
};
const products = [cama, auriculares_import, auriculares_nac];
products.forEach(element => {
    manager.save(element);
});
//# sourceMappingURL=index.js.map