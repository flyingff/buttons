(()=> {

const init = {
  btns: [],
  fields : [
    [ 0,  0,  1,  2,  0],
    [ 1, -1, -1, -1,  1],
    [ 1, -1, -1, -1,  0],
    [ 2, -1, -1, -1,  2],
    [ 2,  0,  2,  1, -1]
  ]
};

const test = ({ btns, fields }) => {
  for (const row of fields) {
    for (const cell of row) {
      if (cell >= 0) {
        return false;
      }
    }
  }
  return true;
};

const N = init.fields.length;
const check = (fields, vec, r, c) => {
  const v = fields[r][c];
  for (let i = 1; i < N; i++) {
    if (fields[r + vec[0] * i][c + vec[1] * i] !== v) {
      return false;
    }
  }
  return true;
};
const clear = (fields, vec, r, c) => {
  for (let i = 0; i < N; i++) {
    fields[r + vec[0] * i][c + vec[1] * i] = -1;
  }
}

const DIRS = [
  [[ 1,  0], 0, 0],
  [[ 0,  1], 0, 0],
  [[-1,  0], 4, 4],
  [[ 0, -1], 4, 4]
];
const fn = ({ btns, fields, fields_ }, id) => {
  if (id === 1) {
    fields[0][0] = fields_[0][1];
    fields[0][1] = fields_[0][2];
    fields[0][2] = fields_[0][3];
    fields[0][3] = fields_[0][4];

    fields[0][4] = fields_[1][4];
    fields[1][4] = fields_[2][4];
    fields[2][4] = fields_[3][4];
    fields[3][4] = fields_[4][4];

    fields[4][4] = fields_[4][3];
    fields[4][3] = fields_[4][2];
    fields[4][2] = fields_[4][1];
    fields[4][1] = fields_[4][0];

    fields[4][0] = fields_[3][0];
    fields[3][0] = fields_[2][0];
    fields[2][0] = fields_[1][0];
    fields[1][0] = fields_[0][0];
  } else if (id === 0) {
    fields[0][1] = fields_[4][1];
    fields[4][1] = fields_[0][1];

    fields[0][2] = fields_[4][2];
    fields[4][2] = fields_[0][2];

    fields[0][3] = fields_[4][3];
    fields[4][3] = fields_[0][3];
  } else if (id === 2) {
    fields[1][0] = fields_[1][4];
    fields[1][4] = fields_[1][0];

    fields[2][0] = fields_[2][4];
    fields[2][4] = fields_[2][0];

    fields[3][0] = fields_[3][4];
    fields[3][4] = fields_[3][0];
  }

  for(const [vec, r, c] of DIRS) {
    if (check(fields, vec, r, c)) {
      clear(fields, vec, r, c);
    }
  }
  return { btns, fields };
};

module.exports = {
  fn, test, init
};

})();