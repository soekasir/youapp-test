import { AxiosService } from "./AxiosService";

class BackendApi extends AxiosService{
  constructor(){
    super('http://techtest.youapp.ai/')
  }
}

export const backendApi=new BackendApi()