export const MICRO = () => {
  const micro = {
    before: { done: () => {}, args: [] },
    after : { done: () => {}, args: [] },
    queue : (raw) => {

      switch (raw.case) {
        case 'wait' : micro.before = raw; break;
        case 'close': micro.after = raw; break;
      }

      return micro;
    },
    logger: {
      error: err => console.error(err)
    }
  };

  return micro;
};
export const DATA = {
  null     : null,
  undefined: undefined,
  number   : 1,
  string   : "string",
  boolean  : true,
  date     : new Date(),
  narray   : [ 1, 2, 3 ],
  barray   : [ true, false ],
  sarray   : [ "s1", "s2", "s3" ]
};