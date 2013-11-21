// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function(){

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (typeof params == "undefined" || params == null) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function(){
      return _(_.range(this.get('n'))).map(function(rowIndex){
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex){
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex){
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex){
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function(){
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex){
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex))  ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function(){
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex){
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _                     
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _ 
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_ 
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)
                                                   
 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    // 
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex){
      var matrix = this.rows();
      var row = matrix[rowIndex];
      var hasConflict = false;
      var numOfPieces = 0;

      for (var i = 0; i < row.length; i++) {
        if(row[i] === 1) {
          numOfPieces++;
        }
      }
      if (numOfPieces === 2) {
        hasConflict = true;
      }
      return hasConflict;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function(){
      // debugger;
      var hasConflicts = false;

      for (var i = 0; i < this.get('n'); i++) {
        if (!hasConflicts) {
          hasConflicts = this.hasRowConflictAt(i);
        }
      }
      return hasConflicts;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    // 
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex){
      // debugger;
      var matrix = this.rows();
      var col = [];
      var hasConflict = false;
      var numOfPieces = 0;

      // create colunm
      for (var i = 0; i < this.get('n'); i++) {
        col.push(matrix[i][colIndex]);
      }

      for (var j = 0; j < col.length; j++) {
        if(col[j] === 1) {
          numOfPieces++;
        }
      }
      if (numOfPieces === 2) {
        hasConflict = true;
      }
      return hasConflict;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function(){
      var hasConflicts = false;

      for (var i = 0; i < this.get('n'); i++) {
        if (!hasConflicts) {
          hasConflicts = this.hasColConflictAt(i);
        }
      }
      return hasConflicts;
    },

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    // 
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow){
      var colIdx = majorDiagonalColumnIndexAtFirstRow;
      // debugger;
      var matrix = this.rows();
      var majorDiagonal = [];
      var hasConflict = false;
      var numOfPieces = 0;
      var row = 0;
      var size = this.get('n');

      // create major diagonal
      //  
      
      // need to determine the boundaries of diagonal
      // if majorDiagonalColumnIndexAtFirstRow is less than 0
      // then the piece is at the row number equal to the negation of 
      // the column index.
      // 
      // actually, what if i conceptually shift the board.  i just need
      // to keep looping the same number of times, but maybe
      // ignore the squares that are outside of board?

      // determines starting row when column index is negative
      if (colIdx < 0) {
        row = 0 - colIdx;
      }
      for (var i = colIdx; i < size - colIdx; i++) {
        if (colIdx >= 0 && colIdx < size) {
          majorDiagonal.push(matrix[row][i]);
        }
        row++;
      }

      // search for
      for (var j = 0; j < majorDiagonal.length; j++) {
        if(majorDiagonal[j] === 1) {
          numOfPieces++;
        }
      }
      if (numOfPieces === 2) {
        hasConflict = true;
      }
      return hasConflict;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function(){
      var hasConflicts = false;

      for (var i = 0; i < this.get('n'); i++) {
        if (!hasConflicts) {
          hasConflicts = this.hasMajorDiagonalConflictAt(i);
        }
      }
      return hasConflicts;
    },

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    // 
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow){
      var colIdx = minorDiagonalColumnIndexAtFirstRow ;
      var matrix = this.rows();
      var minorDiagonal = [];
      var hasConflict = false;
      var numOfPieces = 0;
      var rowIdx = 0;
      var size = this.get('n');

      // need to determine boundary
      // determines starting row when column index greater than size of board
      // 
      if (colIdx >= size) {
        colIdx = size - 1;
      }

      // can i use the column index of first row to help me reason
      // about the diagonal?  
      // create diagonal (fancy version)
      for (var i = colIdx; i >= 0; i--) {
        if (rowIdx >= 0) {
          minorDiagonal.push(matrix[rowIdx][i]);
        }
        rowIdx++;
      }

      // create diagonal (naive version)
      // debugger;
      // for (var i = size - 1; i >= 0; i--) {
      //   minorDiagonal.push(matrix[rowIdx][i]);
      //   rowIdx++;
      // }

      for (var j = 0; j < minorDiagonal.length; j++) {
        if(minorDiagonal[j] === 1) {
          numOfPieces++;
        }
      }
      if (numOfPieces === 2) {
        hasConflict = true;
      }
      return hasConflict;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function(){
      var hasConflicts = false;

      for (var i = 0; i < this.get('n'); i++) {
        if (!hasConflicts) {
          hasConflicts = this.hasMinorDiagonalConflictAt(i);
        }
      }
      return hasConflicts;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

}());
