app.service("Search", function () {
  return { Field: "" };
});
//myCtrl
app.controller("myCtrl", function ($http, $scope) {
  $scope.items = [];
  //connect json
  $http.get("./db/items.json").then(function (reponse) {
    $scope.items = reponse.data;
    $scope.pageCount = Math.ceil($scope.items.length / $scope.pageSize);
  });
  // phân trang, mỗi trang hiển thị 6 sản phẩm
  $scope.pageSize = 6;
  $scope.begin = 0;
  //số trang?
  $scope.pageCount = Math.ceil($scope.items.length / $scope.pageSize); //28/6=4
  //...
  $scope.first = function () {
    $scope.begin = ($scope.pageCount - $scope.pageCount) * $scope.pageSize;
    //start:(6-6)*4=0
  };
  //...
  $scope.prev = function () {
    if ($scope.begin > 0) {
      $scope.begin = $scope.begin - $scope.pageSize;
      // 4>0 =>start:4-4=0
    }
  };
  //...
  $scope.next = function () {
    if (
      $scope.begin >= 0 &&
      $scope.begin < ($scope.pageCount - 1) * $scope.pageSize
    ) {
      //0>=0=> start: 0+6=6
      $scope.begin = $scope.begin + $scope.pageSize;
    }
  };
  //...
  $scope.last = function () {
    $scope.begin = ($scope.pageCount - 1) * $scope.pageSize;
  };
});
//trang chủ
app.controller("trangchu", function ($http, $scope, Search) {
  //search
  $scope.search = Search;
  $scope.tongtien = 0;
  //thêm sản phẩm
  $scope.newArr = [];
  $scope.add = function (i) {
    if ($scope.newArr.length === 0) {
      i.soluong = 1;
      $scope.newArr.push(i);
    } else {
      var flag = false;
      for (var x = 0; x < $scope.newArr.length; x++) {
        if ($scope.newArr[x].id === i.id) {
          flag = true;
          $scope.newArr[x].soluong += 1;
        }
      }
      if (!flag) {
        i.soluong = 1;
        $scope.newArr.push(i);
      }
    }
    $scope.tongtien += parseFloat(i.price);
    console.log($scope.newArr);
  };
  // xóa hàng
  $scope.delete = function (i) {
    var index = $scope.newArr.indexOf(i);
    $scope.newArr.splice(index, 1);
    $scope.tongtien -= parseFloat(i.price * i.soluong);
    console.log($scope.newArr);
  };
  
  // tính tổng
  $scope.total = function () {
    $scope.tongtien = 0;
    $scope.newArr.forEach((i) => {
      $scope.tongtien += i.price * i.soluong;
    });
  };

  //phân loại
  $scope.flag = true;
  $scope.phanloai = function (str) {
    $scope.category = [];
    for (var i = 0; i < $scope.items.length; i++) {
      if ($scope.items[i]["tag"] == str) {
        $scope.category.push($scope.items[i]);
      }
    }
    console.log($scope.category);
    $scope.flag = false;
  };
});

//menu
app.controller("menu", function ($scope, Search) {
  $scope.search = Search;
});

// gioithieu
app.controller("gioithieu", function ($http, $scope) {
  $scope.gioithieu = [];
  //connect json
  $http.get("./db/gioithieu.json").then(function (reponse) {
    $scope.gioithieu = reponse.data;
  });

  ($scope.slogan = "just do it"),
    ($scope.title = "shop early, relax later"),
    ($scope.content = "Make your December extra easy");
});
