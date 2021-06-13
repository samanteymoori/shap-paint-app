
import {getPointMeasures,createLine ,createElipsis} from "../../src/helpers/ShapeHelper"
describe("Test create shapes", () => {
  it("point measures", () => {
    var point1 = { "x": 631, "y": 366 };
    var point2 = {"x":823,"y":199};
    var actual = getPointMeasures( point1, point2 );
    var expected = {"X1":631,"X2":823,"Y1":366,"Y2":199,"Width":192,"Height":-167,"PositiveWidth":192,"PositiveHeight":167,"LargerLength":192,"X3":null,"Y3":null};
    expect(actual).toEqual(expected);
  } );
   it("create line", () => {
    var shape = {"id":1,"name":"Line_1","points":[{"x":404,"y":583},{"x":656,"y":307}],"type":0,"point_count":2,"fillColor":"#e3ff5d"}
    var actual = createLine(shape);
    var expected = {"Shape":{"id":1,"name":"Line_1","points":[{"x":404,"y":583},{"x":656,"y":307}],"type":0,"point_count":2,"fillColor":"#e3ff5d","LowerBoundX":404,"UpperBoundX":656,"LowerBoundY":307,"UpperBoundY":583},"X1":404,"Y1":583,"X2":656,"Y2":307};
    expect(actual).toEqual(expected);
   } );
  it( "create elipsis", () => {
       
    var shape = {"id":1,"name":"Elipsis_1","points":[{"x":438,"y":513},{"x":677,"y":247}],"type":5,"point_count":2,"fillColor":"#80a61e"}
    var actual = createElipsis(shape);
    var expected = { "Shape": { "id": 1, "name": "Elipsis_1", "points": [{ "x": 438, "y": 513 }, { "x": 677, "y": 247 }], "type": 5, "point_count": 2, "fillColor": "#80a61e", "LowerBoundX": 199, "UpperBoundX": 677, "LowerBoundY": 247, "UpperBoundY": 779 }, "X1": 438, "Y1": 513, "RadiusX": 239, "RadiusY": 266, "Rotation": 0, "StartAngle": 0, "EndAngle": 2 };
    expect( actual ).toEqual( expected );
    
  } );
  
  
});
