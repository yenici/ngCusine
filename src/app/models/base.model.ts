interface Info {
  author: {
    uid: string,
    name: string
  };
  date: string;
}

export class BaseModel {
  private _id: string;
  private created: Info;
  private modified: Info;

  get isNew() {
    return !this._id;
  }
}
