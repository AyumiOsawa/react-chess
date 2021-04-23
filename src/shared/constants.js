export default Object.freeze({
  BOARD : {
    size: [
        /* row = */ 8,
        /* col = */ 8
    ] // minimun [8, 8]
  },
  PIECES: {
    number: 8,
    info: [
      {
        name: 'king',
        img : {
            black: './img/king_black.png',
            white: './img/king_white.png',
        }
      },
      {
        name: 'queen',
        img : {
            black: './img/queen_black.png',
            white: './img/queen_white.png',
        }
      },
      {
        name: 'pawn',
        img : {
            black: './img/pawn_black.png',
            white: './img/pawn_white.png',
        }
      },
      {
        name: 'knight',
        img : {
            black: './img/knight_black.png',
            white: './img/knight_white.png',
        }
      },
      {
        name: 'bishop',
        img : {
            black: './img/bishop_black.png',
            white: './img/bishop_white.png',
        }
      },
      {
        name: 'rook',
        img : {
            black: './img/rook_black.png',
            white: './img/rook_white.png',
        }
      },
    ]
  }
})
