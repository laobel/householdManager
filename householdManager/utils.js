/**
 * g根据边界计算最小范围
 * @param boundary
 * @return {{ymin: number, xmin: number, ymax: number, xmax: number}}
 */
function getExtentFromBoundary(boundary) {
    let xmin=180,
        xmax=-180,
        ymin=90,
        ymax=-90;

    for(let i=0;i<boundary.length;i+=2){
        if(xmin>boundary[i]){
            xmin=boundary[i];
        }
        if(xmax<boundary[i]){
            xmax=boundary[i];
        }
        if(ymin>boundary[i+1]){
            ymin=boundary[i+1];
        }
        if(ymax<boundary[i+1]){
            ymax=boundary[i+1];
        }
    }

    return {
        xmin:xmin,
        xmax:xmax,
        ymin:ymin,
        ymax:ymax
    }
}

/**
 * 根据边界计算重心
 * @param boundary
 * @return {number[]}
 */
function getCenterOfGravityPoint(boundary) {
    var  x1=boundary[0],y1=boundary[1],x2,y2,x3,y3;
    var sum_x=0,sum_y=0,sum_s=0;

    for(var i=2;i<boundary.length-2;i+=2){
        x2=boundary[i];
        y2=boundary[i+1];
        x3=boundary[i+2];
        y3=boundary[i+3];

        var s=((x2-x1)*(y3-y1)-(x3-x1)*(y2-y1))/2.0;
        sum_x+=(x1+x2+x3)*s;
        sum_y+=(y1+y2+y3)*s;
        sum_s+=s;
    }

    return [sum_x/sum_s/3.0,sum_y/sum_s/3.0];
}

/**
 * 根据建筑物数据查询父级数据
 * @param data
 * @return {{boundary, floors, name, description, id}|undefined|*}
 */
function getParentByData(data) {
    for(var i=0;i<buildings.length;i++){
        var building=buildings[i];
        for(var j=0;j<building.floors.length;j++){
            var floor=building.floors[j];
            if(floor===data){
                return building;
            }
            for(var k=0;k<floor.houses.length;k++){
                var house=floor.houses[k];
               if(house===data){
                   return  floor;
               }
            }
        }
    }

    return  undefined;
}

/**
 * 根据id获取数据
 * @param id
 * @return {undefined|{boundary, floors, name, description, id}|*|*}
 */
function getDataById(id) {
    for(var i=0;i<buildings.length;i++){
        var building=buildings[i];
        if(building.id===id){
            return  building;
        }
        for(var j=0;j<building.floors.length;j++){
            var floor=building.floors[j];
            if(floor.id===id){
                return floor;
            }
            for(var k=0;k<floor.houses.length;k++){
                var house=floor.houses[k];
                if(house.id===id){
                    return  house;
                }
            }
        }
    }

    return undefined;
}

/**
 * 通过id获取楼层数据
 * @param id
 * @return {undefined|*}
 */
function getFloorDataById(id) {
    for(var i=0;i<buildings.length;i++){
        var building=buildings[i];
        for(var j=0;j<building.floors.length;j++){
            var floor=building.floors[j];
            if(floor.id===id){
                return floor;
            }
        }
    }

    return undefined;
}