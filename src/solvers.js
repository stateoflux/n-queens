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
window.makeEmptyMatrix = function(n){
  return _(_.range(n)).map(function(){
    return _(_.range(n)).map(function(){
      return 0;
    });
  });
};

window.buildSolutionMatrices = function(decisionPaths, n) {
  // debugger;
  var result = [];
  var board = window.makeEmptyMatrix(n);
    
  _.each(decisionPaths, function(decisionPath, index) {
    _.each(decisionPath, function(yCoords, index) {
      board[index][yCoords] = 1;
    });
    result.push(board);
    board = window.makeEmptyMatrix(n);
  });
  return result;
};

window.findAllNRooksSolutions = function(n) {
  var getRemainingColumns = function(collisonCols, n) {
    return _.difference(_.range(n),collisonCols);
  };

  var updateDecisionPath = function(prevDecisionPath, newDecision) {
    var newDecisionPath = prevDecisionPath.slice();
    newDecisionPath.push(newDecision);
    return newDecisionPath;
  };

  // var board = new Board({n:n});
  var decisionPaths = [];
  
  var buildSolution = function(rowIdx, decisionPath, loopLength) {
    if (loopLength === 0) {
      decisionPaths.push(decisionPath);
    }

    var remainingCols = getRemainingColumns(decisionPath, n);
    for (var i = 0; i < loopLength; i++) {
      buildSolution(rowIdx + 1, updateDecisionPath(decisionPath, remainingCols[i]), loopLength - 1);
    }
  };
  
  buildSolution(0, [], n);
  return window.buildSolutionMatrices(decisionPaths, n);
};

window.findNRooksSolution = function(n) {
  var solution;

  if (n === 1 ) {
    solution = [[1]];
  } else {
    solution = window.findAllNRooksSolutions(n)[1];
  }
  
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n){
  var solutionCount = window.findAllNRooksSolutions(n).length;

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


window.findAllNQueens = function(n) {
  var board = new Board({n:n});
  var boards = [];
  var numOfSolutions = 0

  var clone = function(board) {
    var result = [];
    _.each(board, function(row) {
      result.push(row.slice());
    });
    return result;
  };

  var buildQSolution = function(rowIdx) {
    if (rowIdx === n) {
      boards.push(clone(board.rows()));
      numOfSolutions++;
      return;
    }

    for (var i = 0; i < n; i++) {        
      board.togglePiece(rowIdx, i);
      if (!board.hasAnyQueenConflictsOn(rowIdx, i)) {
        buildQSolution(rowIdx + 1);
        board.togglePiece(rowIdx, i);
      } else {
        board.togglePiece(rowIdx, i);
      }
    }
  };
  buildQSolution(0, 0);

  // empty boards means no solution was found 
  if (boards.length === 0) {
    boards.push(board.rows());
  }
  return { 
    boards: boards,
    numOfSolutions: numOfSolutions
  }
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  var solution = window.findAllNQueens(n)['boards'];

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution[0]));
  return solution[0];
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var solutionCount = window.findAllNQueens(n)['numOfSolutions'];

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};




