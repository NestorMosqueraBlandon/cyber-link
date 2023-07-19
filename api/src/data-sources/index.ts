import { InitMongooseOptions, initMongoose } from "./mongoose"

export interface InitDataSorucesOptions {
 mongoose?: InitMongooseOptions
}

export const initDataSources = async({
 mongoose
}: InitDataSorucesOptions) => {
 if(mongoose){
  await initMongoose(mongoose);
 }
}
