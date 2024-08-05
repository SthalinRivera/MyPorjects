import es from "./es.json";
import en from "./en.json";
export default defineI18nConfig(()=>({
    legacy: false ,
    locale: "es",
    messages:{
        es,
        en,
    }
}));