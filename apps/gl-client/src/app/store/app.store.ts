import { Selector, State } from '@ngxs/store';

export interface AppStateModel {
  stateWorks: boolean;
}
export const defaultAppState: AppStateModel = Object.freeze({
  stateWorks: true,
});
@State<AppStateModel>({
  name: 'app',
  defaults: { ...defaultAppState },
})
export class AppStore {
  @Selector()
  public static stateWorks({ stateWorks }: AppStateModel): boolean {
    return stateWorks;
  }
}
