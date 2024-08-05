import type { Video } from "~/interfaces/project";

export const useFavoritos = () => useState<Video[]>("favoritos", () => []); 