/*           _                    
   ___  ___ | |_   _____ _ __ ___ 
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n){
  var solution = [];

  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

  var board = makeEmptyMatrix(3);

  var nRooksSolver = function() {
    var colIdx = board.length;
    
    var determineRemainingColumns = function() {};
    
    var buildSolution(rowIdx, colIndices, loopLength) {
      // termination case
      
      remainingCols = [];
      for (var i = 0; i < loopLength; i++) { 
        board[rowIdx][remainingCols[]] = 1;
        buildSolution(rowIndices, colIndices, loopLength - 1);
      }
    };
    
    buildSolution([0], [0], loopLength);
  }

  

  // need a function to generate a board
  /* var board = makeEmptyMatrix(n);

  // I'm wondering if i could pass this thing by generating
  // diagonal rook placements for each size of board?
  // this actually works!
  for (var i = 0; i < board.length; i++) {
    board[i][i] = 1;
  }
  solution = board;

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
}; */



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
