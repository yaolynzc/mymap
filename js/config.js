// mapbox基础服务配置
var mapboxBaseService = {
  geoserver: 'http://49.234.43.229:8080/geoserver',     // Mapbox地图-GeoServer服务地址
  sprite: 'http://49.234.43.229:8089/mapbox'           // Mapbox地图sprite和pbf字体服务地址
}

var config = {
  mapCenter: [114.402450, 30.479920],
  /**
 * Mapbox地图-标准样式
 */
  mapStyle: {
    "version": 8,
    // //我使用的这个版本sprite要写全路径
    "sprite": mapboxBaseService.sprite + "/sprites/sprite",
    // //字体.pbf文件获取
    "glyphs": mapboxBaseService.sprite + "/fonts/{fontstack}/{range}.pbf",
    // "glyphs": "/assets/fonts/{fontstack}/{range}.pbf",
    "sources": {
      "china": {
        //矢量类型
        "type": "vector",
        // tms服务有此一行，wmts无需此行
        "scheme": "tms",
        "tiles": [
          //获取GeoServer 矢量切片服务,可以是一下几种方式
          mapboxBaseService.geoserver + "/gwc/service/tms/1.0.0/map:mymap20@EPSG:900913@pbf/{z}/{x}/{y}.pbf",
          //虚拟目录
          // "http://localhost:61477/maptile/{z}/{x}/{y}.pbf"
          // mapboxBaseService.geoserver + "/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=map:chinamap&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=application/vnd.mapbox-vector-tile&TILECOL={x}&TILEROW={y}"
        ]
      },
      "china_l15": {
        "type": "vector",
        "scheme": "tms",
        "tiles": [
          mapboxBaseService.geoserver + "/gwc/service/tms/1.0.0/map:mymapl15@EPSG:900913@pbf/{z}/{x}/{y}.pbf",
        ]
      },
      "china_l10": {
        "type": "vector",
        "scheme": "tms",
        "tiles": [
          mapboxBaseService.geoserver + "/gwc/service/tms/1.0.0/map:mymapl10@EPSG:900913@pbf/{z}/{x}/{y}.pbf",
        ]
      },
      "china_l5": {
        "type": "vector",
        "scheme": "tms",
        "tiles": [
          mapboxBaseService.geoserver + "/gwc/service/tms/1.0.0/map:mymapl5@EPSG:900913@pbf/{z}/{x}/{y}.pbf",
        ]
      },
    },
    // 根据layer数组顺序绘制，最后定义的在地图最上层
    "layers": [
      // 地图背景
      {
        "id": "background",
        "type": "background",
        "layout": {},
        "paint": {
          "background-color": {
            "base": 1,
            "stops": [
              [
                11,
                "hsl(42, 62.50%, 96.86%)"
              ],
              [
                13,
                "hsl(35, 12%, 89%)"
              ]
            ]
          }
        },
        "interactive": true
      },

      // 水面
      {
        "id": "water",
        "type": "fill",
        "source": "china",
        "source-layer": "gis_osm_water_a_free_1",
        "minzoom": 12,
        "layout": {},
        "paint": {
          "fill-color": "hsl(213, 100.00% , 81.96%)" // 196, 80% , 70%
        },
        "interactive": true
      },
      // 水面-L15
      {
        "id": "water_l15",
        "type": "fill",
        "source": "china_l15",
        "source-layer": "gis_osm_water_a_free_1_l15",
        "minzoom": 9,
        "maxzoom": 12,
        "filter": [
          "in",
          "fclass",
          "river",
          "water"
        ],
        "layout": {},
        "paint": {
          "fill-color": "hsl(213, 100.00% , 81.96%)" // 196, 80% , 70%
        },
        "interactive": true
      },
      // 水面-L10
      {
        "id": "water_l10",
        "type": "fill",
        "source": "china_l10",
        "source-layer": "gis_osm_water_a_free_1_l10",
        "minzoom": 6,
        "maxzoom": 9,
        "filter": [
          "in",
          "fclass",
          "river"
        ],
        "layout": {},
        "paint": {
          "fill-color": "hsl(213, 100.00% , 81.96%)" // 196, 80% , 70%
        },
        "interactive": true
      },

      // 海洋
      {
        "id": "ocean",
        "type": "fill",
        "source": "china",
        "source-layer": "water_polygons",
        "minzoom": 16,
        "layout": {},
        "paint": {
          "fill-color": "hsl(213, 100.00% , 81.96%)"
        },
        "interactive": true
      },
      // 海洋-L15
      {
        "id": "ocean_l15",
        "type": "fill",
        "source": "china_l15",
        "source-layer": "water_polygons_l15",
        "minzoom": 11,
        "maxzoom": 16,
        "layout": {},
        "paint": {
          "fill-color": "hsl(213, 100.00% , 81.96%)"
        },
        "interactive": true
      },
      // 海洋-L10
      {
        "id": "ocean_l10",
        "type": "fill",
        "source": "china_l10",
        "source-layer": "water_polygons_l10",
        "minzoom": 6,
        "maxzoom": 11,
        "layout": {},
        "paint": {
          "fill-color": "hsl(213, 100.00% , 81.96%)"
        },
        "interactive": true
      },
      // 海洋-L5
      {
        "id": "ocean_l5",
        "type": "fill",
        "source": "china_l5",
        "source-layer": "water_polygons_l5",
        "maxzoom": 6,
        "layout": {},
        "paint": {
          "fill-color": "hsl(213, 100.00% , 81.96%)"
        },
        "interactive": true
      },

      // 三、四级边界
      {
        "id": "admin-3-4-boundaries",
        "type": "line",
        "source": "china",
        "source-layer": "province",
        "minzoom": 16,
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-dasharray": {
            "base": 1,
            "stops": [
              [
                6,
                [
                  2,
                  0
                ]
              ],
              [
                7,
                [
                  2,
                  2,
                  6,
                  2
                ]
              ]
            ]
          },
          "line-width": {
            "base": 1,
            "stops": [
              [
                7,
                0.75
              ],
              [
                12,
                1.5
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                2,
                0
              ],
              [
                3,
                1
              ]
            ]
          },
          "line-color": {
            "base": 1,
            "stops": [
              [
                3,
                "hsl(230, 14%, 77%)"
              ],
              [
                7,
                "hsl(230, 8%, 62%)"
              ]
            ]
          }
        },
        "interactive": true
      },
      // 三、四级边界-L15
      {
        "id": "admin-3-4-boundaries_l15",
        "type": "line",
        "source": "china_l15",
        "source-layer": "province_l15",
        "minzoom": 11,
        "maxzoom": 16,
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-dasharray": {
            "base": 1,
            "stops": [
              [
                6,
                [
                  2,
                  0
                ]
              ],
              [
                7,
                [
                  2,
                  2,
                  6,
                  2
                ]
              ]
            ]
          },
          "line-width": {
            "base": 1,
            "stops": [
              [
                7,
                0.75
              ],
              [
                12,
                1.5
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                2,
                0
              ],
              [
                3,
                1
              ]
            ]
          },
          "line-color": {
            "base": 1,
            "stops": [
              [
                3,
                "hsl(230, 14%, 77%)"
              ],
              [
                7,
                "hsl(230, 8%, 62%)"
              ]
            ]
          }
        },
        "interactive": true
      },
      // 三、四级边界-L10
      {
        "id": "admin-3-4-boundaries_l10",
        "type": "line",
        "source": "china_l10",
        "source-layer": "province_l10",
        "minzoom": 6,
        "maxzoom": 11,
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-dasharray": {
            "base": 1,
            "stops": [
              [
                6,
                [
                  2,
                  0
                ]
              ],
              [
                7,
                [
                  2,
                  2,
                  6,
                  2
                ]
              ]
            ]
          },
          "line-width": {
            "base": 1,
            "stops": [
              [
                7,
                0.75
              ],
              [
                12,
                1.5
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                2,
                0
              ],
              [
                3,
                1
              ]
            ]
          },
          "line-color": {
            "base": 1,
            "stops": [
              [
                3,
                "hsl(230, 14%, 77%)"
              ],
              [
                7,
                "hsl(230, 8%, 62%)"
              ]
            ]
          }
        },
        "interactive": true
      },
      // 三、四级边界-L5
      {
        "id": "admin-3-4-boundaries_l5",
        "type": "line",
        "source": "china_l5",
        "source-layer": "province_l5",
        "maxzoom": 6,
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-dasharray": {
            "base": 1,
            "stops": [
              [
                6,
                [
                  2,
                  0
                ]
              ],
              [
                7,
                [
                  2,
                  2,
                  6,
                  2
                ]
              ]
            ]
          },
          "line-width": {
            "base": 1,
            "stops": [
              [
                7,
                0.75
              ],
              [
                12,
                1.5
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                2,
                0
              ],
              [
                3,
                1
              ]
            ]
          },
          "line-color": {
            "base": 1,
            "stops": [
              [
                3,
                "hsl(230, 14%, 77%)"
              ],
              [
                7,
                "hsl(230, 8%, 62%)"
              ]
            ]
          }
        },
        "interactive": true
      },

      // 三、四级边界背景
      {
        "id": "admin-3-4-boundaries-bg",
        "type": "line",
        "source": "china",
        "source-layer": "province",
        "minzoom": 16,
        "layout": {
          "line-join": "bevel"
        },
        "paint": {
          "line-color": {
            "base": 1,
            "stops": [
              [
                8,
                "hsl(35, 12%, 89%)"
              ],
              [
                16,
                "hsl(230, 49%, 90%)"
              ]
            ]
          },
          "line-width": {
            "base": 1,
            "stops": [
              [
                7,
                3.75
              ],
              [
                12,
                5.5
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                7,
                0
              ],
              [
                8,
                0.75
              ]
            ]
          },
          "line-dasharray": [
            1,
            0
          ],
          "line-translate": [
            0,
            0
          ],
          "line-blur": {
            "base": 1,
            "stops": [
              [
                3,
                0
              ],
              [
                8,
                3
              ]
            ]
          }
        },
        "interactive": true
      },
      // 三、四级边界背景-L15
      {
        "id": "admin-3-4-boundaries-bg_l15",
        "type": "line",
        "source": "china_l15",
        "source-layer": "province_l15",
        "minzoom": 11,
        "maxzoom": 16,
        "layout": {
          "line-join": "bevel"
        },
        "paint": {
          "line-color": {
            "base": 1,
            "stops": [
              [
                8,
                "hsl(35, 12%, 89%)"
              ],
              [
                16,
                "hsl(230, 49%, 90%)"
              ]
            ]
          },
          "line-width": {
            "base": 1,
            "stops": [
              [
                7,
                3.75
              ],
              [
                12,
                5.5
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                7,
                0
              ],
              [
                8,
                0.75
              ]
            ]
          },
          "line-dasharray": [
            1,
            0
          ],
          "line-translate": [
            0,
            0
          ],
          "line-blur": {
            "base": 1,
            "stops": [
              [
                3,
                0
              ],
              [
                8,
                3
              ]
            ]
          }
        },
        "interactive": true
      },
      // 三、四级边界背景-L10
      {
        "id": "admin-3-4-boundaries-bg_l10",
        "type": "line",
        "source": "china_l10",
        "source-layer": "province_l10",
        "minzoom": 6,
        "maxzoom": 11,
        "layout": {
          "line-join": "bevel"
        },
        "paint": {
          "line-color": {
            "base": 1,
            "stops": [
              [
                8,
                "hsl(35, 12%, 89%)"
              ],
              [
                16,
                "hsl(230, 49%, 90%)"
              ]
            ]
          },
          "line-width": {
            "base": 1,
            "stops": [
              [
                7,
                3.75
              ],
              [
                12,
                5.5
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                7,
                0
              ],
              [
                8,
                0.75
              ]
            ]
          },
          "line-dasharray": [
            1,
            0
          ],
          "line-translate": [
            0,
            0
          ],
          "line-blur": {
            "base": 1,
            "stops": [
              [
                3,
                0
              ],
              [
                8,
                3
              ]
            ]
          }
        },
        "interactive": true
      },
      // 三、四级边界背景-L5
      {
        "id": "admin-3-4-boundaries-bg_l5",
        "type": "line",
        "source": "china_l5",
        "source-layer": "province_l5",
        "maxzoom": 6,
        "layout": {
          "line-join": "bevel"
        },
        "paint": {
          "line-color": {
            "base": 1,
            "stops": [
              [
                8,
                "hsl(35, 12%, 89%)"
              ],
              [
                16,
                "hsl(230, 49%, 90%)"
              ]
            ]
          },
          "line-width": {
            "base": 1,
            "stops": [
              [
                7,
                3.75
              ],
              [
                12,
                5.5
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                7,
                0
              ],
              [
                8,
                0.75
              ]
            ]
          },
          "line-dasharray": [
            1,
            0
          ],
          "line-translate": [
            0,
            0
          ],
          "line-blur": {
            "base": 1,
            "stops": [
              [
                3,
                0
              ],
              [
                8,
                3
              ]
            ]
          }
        },
        "interactive": true
      },

      // world边界
      {
        "id": "admin-2-boundaries",
        "type": "line",
        "source": "china_l5",
        "source-layer": "world_nation_pl",
        "maxzoom": 6,
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": "hsl(230, 8%, 51%)",
          "line-width": {
            "base": 1,
            "stops": [
              [
                3,
                0.5
              ],
              [
                10,
                2
              ]
            ]
          }
        },
        "interactive": true
      },

      // china边界突出显示
      {
        "id": "admin-3-boundaries",
        "type": "line",
        "source": "china_l5",
        "source-layer": "world_nation_pl",
        "maxzoom": 6,
        "filter": [
          "in",
          "fips_cntry",
          "CH",
          "TW"
        ],
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": "hsl(350, 45.37% , 59.80%)",
          "line-width": {
            "base": 4,
            "stops": [
              [
                3,
                3
              ],
              [
                10,
                2
              ]
            ]
          }
        },
        "interactive": true
      },

      // hubei边界突出显示
      {
        "id": "hubei-3-boundaries",
        "type": "line",
        "source": "china_l5",
        "source-layer": "province_l5",
        "maxzoom": 6,
        "filter": [
          "in",
          "adcode",
          "420000"
        ],
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": "hsl(33,86%,42%)",
          "line-width": {
            "base": 4,
            "stops": [
              [
                3,
                3
              ],
              [
                10,
                2
              ]
            ]
          }
        },
        "interactive": true
      },

      // wh边界突出显示
      {
        "id": "wh-3-boundaries",
        "type": "line",
        "source": "china_l10",
        "source-layer": "city_l10",
        "minzoom": 6,
        "maxzoom": 11,
        "filter": [
          "in",
          "adcode",
          "420100"
        ],
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": "hsl(26,11%,29%)",
          "line-width": {
            "base": 4,
            "stops": [
              [
                3,
                3
              ],
              [
                10,
                2
              ]
            ]
          }
        },
        "interactive": true
      },

      // 墓地
      {
        "id": "cemetery",
        "type": "fill",
        "source": "china",
        "source-layer": "gis_osm_pofw_a_free_1",
        "minzoom": 16,
        "layout": {},
        "paint": {
          "fill-color": "hsl(75, 37%, 81%)"
        },
        "interactive": true
      },
      // 墓地-L15
      {
        "id": "cemetery_l15",
        "type": "fill",
        "source": "china_l15",
        "source-layer": "gis_osm_pofw_a_free_1_l15",
        "minzoom": 13,
        "maxzoom": 16,
        "layout": {},
        "paint": {
          "fill-color": "hsl(75, 37%, 81%)"
        },
        "interactive": true
      },

      // 医院
      {
        "id": "hospital",
        "type": "fill",
        "source": "china",
        "source-layer": "gis_osm_pois_a_free_1",
        "minzoom": 15,
        "filter": [
          "==",
          "fclass",
          "hospital"
        ],
        "layout": {},
        "paint": {
          "fill-color": {
            "base": 1,
            "stops": [
              [
                15.5,
                "hsl(340, 37%, 87%)"
              ],
              [
                16,
                "hsl(340, 63%, 89%)"
              ]
            ]
          }
        },
        "interactive": true
      },
      // 医院-L15
      {
        "id": "hospital_l15",
        "type": "fill",
        "source": "china_l15",
        "source-layer": "gis_osm_pois_a_free_1_l15",
        "minzoom": 13,
        "maxzoom": 15,
        "filter": [
          "==",
          "fclass",
          "hospital"
        ],
        "layout": {},
        "paint": {
          "fill-color": {
            "base": 1,
            "stops": [
              [
                15.5,
                "hsl(340, 37%, 87%)"
              ],
              [
                16,
                "hsl(340, 63%, 89%)"
              ]
            ]
          }
        },
        "interactive": true
      },

      // 学校
      {
        "id": "school",
        "type": "fill",
        "source": "china",
        "source-layer": "gis_osm_pois_a_free_1",
        "minzoom": 15,
        "filter": [
          "in",
          "fclass",
          "school",
          "college",
          "education",
          "university",
          "kindergarten"
        ],
        "layout": {},
        "paint": {
          "fill-color": {
            "base": 1,
            "stops": [
              [
                15.5,
                "hsl(50, 47%, 81%)"
              ],
              [
                16,
                "hsl(50, 63%, 84%)"
              ]
            ]
          }
        },
        "interactive": true
      },
      // 学校-L15
      {
        "id": "school_l15",
        "type": "fill",
        "source": "china_l15",
        "source-layer": "gis_osm_pois_a_free_1_l15",
        "minzoom": 13,
        "maxzoom": 15,
        "filter": [
          "in",
          "fclass",
          "school",
          "college",
          "education",
          "university",
          "kindergarten"
        ],
        "layout": {},
        "paint": {
          "fill-color": {
            "base": 1,
            "stops": [
              [
                15.5,
                "hsl(50, 47%, 81%)"
              ],
              [
                16,
                "hsl(50, 63%, 84%)"
              ]
            ]
          }
        },
        "interactive": true
      },

      // 机场
      {
        "id": "industrial",
        "type": "fill",
        "source": "china",
        "source-layer": "gis_osm_transport_a_free_1",
        "minzoom": 15,
        "layout": {},
        "paint": {
          "fill-color": {
            "base": 1,
            "stops": [
              [
                15.5,
                "hsl(230, 15%, 86%)"
              ],
              [
                16,
                "hsl(230, 29%, 89%)"
              ]
            ]
          }
        },
        "interactive": true
      },
      // 机场-L15
      {
        "id": "industrial_l15",
        "type": "fill",
        "source": "china_l15",
        "source-layer": "gis_osm_transport_a_free_1_l15",
        "minzoom": 13,
        "maxzoom": 15,
        "layout": {},
        "paint": {
          "fill-color": {
            "base": 1,
            "stops": [
              [
                15.5,
                "hsl(230, 15%, 86%)"
              ],
              [
                16,
                "hsl(230, 29%, 89%)"
              ]
            ]
          }
        },
        "interactive": true
      },

      // 公园
      {
        "id": "park",
        "type": "fill",
        "source": "china",
        "source-layer": "gis_osm_pois_a_free_1",
        "minzoom": 13,
        "filter": [
          "in",
          "fclass",
          "park",
          "pitch"
        ],
        "layout": {},
        "paint": {
          "fill-color": "hsl(100, 58%, 76%)",
          "fill-opacity": {
            "base": 1,
            "stops": [
              [
                5,
                0
              ],
              [
                6,
                1
              ]
            ]
          }
        },
        "interactive": true
      },
      // 公园-L15
      {
        "id": "park_l15",
        "type": "fill",
        "source": "china_l15",
        "source-layer": "gis_osm_pois_a_free_1_l15",
        "minzoom": 9,
        "maxzoom": 13,
        "filter": [
          "in",
          "fclass",
          "park",
          "pitch"
        ],
        "layout": {},
        "paint": {
          "fill-color": "hsl(100, 58%, 76%)",
          "fill-opacity": {
            "base": 1,
            "stops": [
              [
                5,
                0
              ],
              [
                6,
                1
              ]
            ]
          }
        },
        "interactive": true
      },

      // 建筑物
      {
        "id": "building",
        "type": "fill",
        "source": "china",
        "source-layer": "gis_osm_buildings_a_free_1",
        "minzoom": 15,
        "layout": {},
        "paint": {
          "fill-color": {
            "base": 1,
            "stops": [
              [
                15,
                "hsl(35, 11%, 88%)"
              ],
              [
                16,
                "hsl(35, 8%, 85%)"
              ]
            ]
          },
          "fill-opacity": {
            "base": 1,
            "stops": [
              [
                15,
                0.5
              ],
              [
                16,
                1
              ]
            ]
          },
          "fill-outline-color": "hsl(35, 6%, 79%)"
        },
        "interactive": true
      },

      // 小区内部道路
      {
        "id": "road-street",
        "type": "line",
        "source": "china",
        "source-layer": "gis_osm_roads_free_1",
        "minzoom": 15,
        "filter": [
          "in",
          "fclass",
          // "residential",
          "track",
          "service",
          "unclassified"
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12.5,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13.99,
                0
              ],
              [
                14,
                1
              ]
            ]
          }
        },
        "interactive": true
      },

      // 小区内部道路case
      {
        "id": "road-street-case",
        "type": "line",
        "source": "china",
        "source-layer": "gis_osm_roads_free_1",
        "minzoom": 15,
        "filter": [
          "in",
          "fclass",
          // "residential",
          "track",
          "service",
          "unclassified"
        ],
        "layout": {
          // "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.75
              ],
              [
                20,
                2
              ]
            ]
          },
          "line-color": "hsl(230, 24%, 87%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                13,
                0
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13.99,
                0
              ],
              [
                14,
                1
              ]
            ]
          }
        },
        "interactive": true
      },

      // 人行道
      {
        "id": "road-path-bg",
        "type": "line",
        "source": "china",
        "source-layer": "gis_osm_roads_free_1",
        "minzoom": 15,
        "filter": [
          "==",
          "fclass",
          "path"
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                15,
                2
              ],
              [
                18,
                7
              ]
            ]
          },
          "line-dasharray": [
            1,
            0
          ],
          "line-color": "hsl(230, 17%, 82%)",
          "line-blur": 0,
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                14,
                0
              ],
              [
                14.25,
                0.75
              ]
            ]
          }
        },
        "interactive": true
      },

      // 人行道case
      {
        "id": "road-path",
        "type": "line",
        "source": "china",
        "source-layer": "gis_osm_roads_free_1",
        "minzoom": 15,
        "filter": [
          "==",
          "fclass",
          "path"
        ],
        "layout": {
          // "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                15,
                1
              ],
              [
                18,
                4
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-dasharray": {
            "base": 1,
            "stops": [
              [
                14,
                [
                  1,
                  0
                ]
              ],
              [
                15,
                [
                  1.75,
                  1
                ]
              ],
              [
                16,
                [
                  1,
                  0.75
                ]
              ],
              [
                17,
                [
                  1,
                  0.5
                ]
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                14,
                0
              ],
              [
                14.25,
                1
              ]
            ]
          }
        },
        "interactive": true
      },

      // 四级道路
      {
        "id": "road-track",
        "type": "line",
        "source": "china",
        "source-layer": "gis_osm_roads_free_1",
        "minzoom": 14,
        "filter": [
          "in",
          "fclass",
          "tertiary",
          // "tertiary_link",
          "residential"
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                8.5,
                0.5
              ],
              [
                10,
                0.75
              ],
              [
                18,
                26
              ]
            ]
          },
          "line-color": {
            "base": 1,
            "stops": [
              [
                5,
                "hsl(35, 32%, 91%)"
              ],
              [
                8,
                "hsl(0, 0%, 100%)"
              ]
            ]
          },
          "line-opacity": {
            "base": 1.2,
            "stops": [
              [
                5,
                0
              ],
              [
                5.5,
                1
              ]
            ]
          }
        },
        "interactive": true
      },

      // 四级道路case
      {
        "id": "road-track-case",
        "type": "line",
        "source": "china",
        "source-layer": "gis_osm_roads_free_1",
        "minzoom": 14,
        "filter": [
          "in",
          "fclass",
          "tertiary",
          // "tertiary_link",
          "residential"
        ],
        "layout": {
          // "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.2,
            "stops": [
              [
                10,
                0.75
              ],
              [
                18,
                2
              ]
            ]
          },
          "line-color": "hsl(230, 24%, 87%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                8.5,
                0.5
              ],
              [
                10,
                0.75
              ],
              [
                18,
                26
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                9.99,
                0
              ],
              [
                10,
                1
              ]
            ]
          }
        },
        "interactive": true
      },

      // 三级道路
      {
        "id": "road-secondary",
        "type": "line",
        "source": "china",
        "source-layer": "gis_osm_roads_free_1",
        "minzoom": 13,
        "filter": [
          "in",
          "fclass",
          "secondary",
          // "secondary_link"
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                8.5,
                0.5
              ],
              [
                10,
                0.75
              ],
              [
                18,
                26
              ]
            ]
          },
          "line-color": {
            "base": 1,
            "stops": [
              [
                5,
                "hsl(35, 32%, 91%)"
              ],
              [
                8,
                "hsl(0, 0%, 100%)"
              ]
            ]
          },
          "line-opacity": {
            "base": 1.2,
            "stops": [
              [
                5,
                0
              ],
              [
                5.5,
                1
              ]
            ]
          }
        },
        "interactive": true
      },

      // 三级道路case
      {
        "id": "road-secondary-case",
        "type": "line",
        "source": "china",
        "source-layer": "gis_osm_roads_free_1",
        "minzoom": 13,
        "filter": [
          "in",
          "fclass",
          "secondary",
          // "secondary_link"
        ],
        "layout": {
          // "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.2,
            "stops": [
              [
                10,
                0.75
              ],
              [
                18,
                2
              ]
            ]
          },
          "line-color": "hsl(230, 24%, 87%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                8.5,
                0.5
              ],
              [
                10,
                0.75
              ],
              [
                18,
                26
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                9.99,
                0
              ],
              [
                10,
                1
              ]
            ]
          }
        },
        "interactive": true
      },

      // 二级道路
      {
        "id": "road-primary",
        "type": "line",
        "source": "china",
        "source-layer": "gis_osm_roads_free_1",
        "minzoom": 13,
        "filter": [
          "in",
          "fclass",
          "primary",
          // "primary_link",
          // "motorway_link",
          // "trunk_link"
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          },
          "line-color": {
            "base": 1,
            "stops": [
              [
                5,
                "hsl(35, 32%, 91%)"
              ],
              [
                7,
                "hsl(0, 0%, 100%)"
              ]
            ]
          },
          "line-opacity": 1
        },
        "interactive": true
      },
      // 二级道路-L15
      {
        "id": "road-primary_l15",
        "type": "line",
        "source": "china_l15",
        "source-layer": "gis_osm_roads_free_1_l15",
        "minzoom": 10,
        "maxzoom": 13,
        "filter": [
          "in",
          "fclass",
          "primary",
          // "primary_link",
          // "motorway_link",
          // "trunk_link"
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          },
          "line-color": {
            "base": 1,
            "stops": [
              [
                5,
                "hsl(35, 32%, 91%)"
              ],
              [
                7,
                "hsl(0, 0%, 100%)"
              ]
            ]
          },
          "line-opacity": 1
        },
        "interactive": true
      },

      // 二级道路case
      {
        "id": "road-primary-case",
        "type": "line",
        "source": "china",
        "source-layer": "gis_osm_roads_free_1",
        "minzoom": 13,
        "filter": [
          "in",
          "fclass",
          "primary",
          // "primary_link",
          // "motorway_link",
          // "trunk_link"
        ],
        "layout": {
          // "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                10,
                1
              ],
              [
                16,
                2
              ]
            ]
          },
          "line-color": "hsl(230, 24%, 87%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                9.99,
                0
              ],
              [
                10,
                1
              ]
            ]
          }
        },
        "interactive": true
      },
      // 二级道路case-L15
      {
        "id": "road-primary-case_l15",
        "type": "line",
        "source": "china_l15",
        "source-layer": "gis_osm_roads_free_1_l15",
        "minzoom": 11,
        "maxzoom": 13,
        "filter": [
          "in",
          "fclass",
          "primary",
          // "primary_link",
          // "motorway_link",
          // "trunk_link"
        ],
        "layout": {
          // "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                10,
                1
              ],
              [
                16,
                2
              ]
            ]
          },
          "line-color": "hsl(230, 24%, 87%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                9.99,
                0
              ],
              [
                10,
                1
              ]
            ]
          }
        },
        "interactive": true
      },

      // 主要道路
      {
        "id": "road-trunk",
        "type": "line",
        "source": "china",
        "source-layer": "gis_osm_roads_free_1",
        "minzoom": 13,
        "filter": [
          "in",
          "fclass",
          "trunk",
          // "trunk_link"
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          },
          "line-color": "hsl(46, 85%, 67%)",
        },
        "interactive": true
      },
      // 主要道路-L15
      {
        "id": "road-trunk_l15",
        "type": "line",
        "source": "china_l15",
        "source-layer": "gis_osm_roads_free_1_l15",
        "minzoom": 9,
        "maxzoom": 13,
        "filter": [
          "in",
          "fclass",
          "trunk",
          // "trunk_link"
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          },
          "line-color": "hsl(46, 85%, 67%)",
        },
        "interactive": true
      },

      // 主要道路case
      {
        "id": "road-trunk-case",
        "type": "line",
        "source": "china",
        "source-layer": "gis_osm_roads_free_1",
        "minzoom": 13,
        "filter": [
          "in",
          "fclass",
          "trunk",
          // "trunk_link"
        ],
        "layout": {
          // "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                10,
                1
              ],
              [
                16,
                2
              ]
            ]
          },
          "line-color": "hsl(46, 80%, 60%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          }
        },
        "interactive": true
      },
      // 主要道路case-L15
      {
        "id": "road-trunk-case_l15",
        "type": "line",
        "source": "china_l15",
        "source-layer": "gis_osm_roads_free_1_l15",
        "minzoom": 9,
        "maxzoom": 13,
        "filter": [
          "in",
          "fclass",
          "trunk",
          // "trunk_link"
        ],
        "layout": {
          // "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                10,
                1
              ],
              [
                16,
                2
              ]
            ]
          },
          "line-color": "hsl(46, 80%, 60%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          }
        },
        "interactive": true
      },

      // 主要道路Link
      {
        "id": "road-trunk-link",
        "type": "line",
        "source": "china",
        "source-layer": "gis_osm_roads_free_1",
        "minzoom": 11,
        "filter": [
          "in",
          "fclass",
          // "trunk",
          "trunk_link"
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          },
          "line-color": "hsl(46, 85%, 67%)",
        },
        "interactive": true
      },
      // 主要道路Link-case
      {
        "id": "road-trunk-link-case",
        "type": "line",
        "source": "china",
        "source-layer": "gis_osm_roads_free_1",
        "minzoom": 11,
        "filter": [
          "in",
          "fclass",
          // "trunk",
          "trunk_link"
        ],
        "layout": {
          // "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                10,
                1
              ],
              [
                16,
                2
              ]
            ]
          },
          "line-color": "hsl(46, 80%, 60%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          }
        },
        "interactive": true
      },

      // 高速公路
      {
        "id": "bridge-motorway",
        "type": "line",
        "source": "china",
        "source-layer": "gis_osm_roads_free_1",
        "minzoom": 13,
        "filter": [
          "in",
          "fclass",
          "motorway",
          // "motorway_link"
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          },
          "line-color": "hsl(26, 100.00% , 68.04%)"
        },
        "interactive": true
      },
      // 高速公路-L15
      {
        "id": "bridge-motorway_l15",
        "type": "line",
        "source": "china_l15",
        "source-layer": "gis_osm_roads_free_1_l15",
        "minzoom": 11,
        "maxzoom": 13,
        "filter": [
          "in",
          "fclass",
          "motorway",
          // "motorway_link"
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          },
          "line-color": "hsl(26, 100.00% , 68.04%)"
        },
        "interactive": true
      },
      // 高速公路-L10
      {
        "id": "bridge-motorway_l10",
        "type": "line",
        "source": "china_l10",
        "source-layer": "gis_osm_roads_free_1_l10",
        "minzoom": 8,
        "maxzoom": 11,
        "filter": [
          "in",
          "fclass",
          "motorway",
          // "motorway_link"
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          },
          "line-color": "hsl(26, 100.00% , 68.04%)"
        },
        "interactive": true
      },

      // 高速公路case
      {
        "id": "bridge-motorway-case",
        "type": "line",
        "source": "china",
        "source-layer": "gis_osm_roads_free_1",
        "minzoom": 13,
        "filter": [
          "in",
          "fclass",
          "motorway",
          // "motorway_link"
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                10,
                1
              ],
              [
                16,
                2
              ]
            ]
          },
          "line-color": "hsl(26, 92.07% , 55.49%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          }
        },
        "interactive": true
      },
      // 高速公路case-L15
      {
        "id": "bridge-motorway-case_l15",
        "type": "line",
        "source": "china_l15",
        "source-layer": "gis_osm_roads_free_1_l15",
        "minzoom": 11,
        "maxzoom": 13,
        "filter": [
          "in",
          "fclass",
          "motorway",
          // "motorway_link"
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                10,
                1
              ],
              [
                16,
                2
              ]
            ]
          },
          "line-color": "hsl(26, 92.07% , 55.49%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          }
        },
        "interactive": true
      },
      // 高速公路case-L10
      {
        "id": "bridge-motorway-case_l10",
        "type": "line",
        "source": "china_l10",
        "source-layer": "gis_osm_roads_free_1_l10",
        "minzoom": 8,
        "maxzoom": 11,
        "filter": [
          "in",
          "fclass",
          "motorway",
          // "motorway_link"
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                10,
                1
              ],
              [
                16,
                2
              ]
            ]
          },
          "line-color": "hsl(26, 92.07% , 55.49%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          }
        },
        "interactive": true
      },

      // 高速公路（出入口）Link
      {
        "id": "bridge-motorway-link",
        "type": "line",
        "source": "china",
        "source-layer": "gis_osm_roads_free_1",
        "minzoom": 11,
        "filter": [
          "in",
          "fclass",
          // "motorway",
          "motorway_link"
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          },
          "line-color": "hsl(26, 100.00% , 68.04%)"
        },
        "interactive": true
      },

      // 高速公路（出入口）Link-case
      {
        "id": "bridge-motorway-link-case",
        "type": "line",
        "source": "china",
        "source-layer": "gis_osm_roads_free_1",
        "minzoom": 11,
        "filter": [
          "in",
          "fclass",
          // "motorway",
          "motorway_link"
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                10,
                1
              ],
              [
                16,
                2
              ]
            ]
          },
          "line-color": "hsl(26, 92.07% , 55.49%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          }
        },
        "interactive": true
      },

      // 铁路（实线）
      {
        "id": "rail-solid",
        "type": "line",
        "source": "china",
        "source-layer": "gis_osm_railways_free_1",
        "minzoom": 16,
        "filter": [
          "in",
          "fclass",
          "rail"
        ],
        "paint": {
          "line-width": 2.4,
          "line-color": "#949494"
        }
      },
      // 铁路（实线）-L15
      {
        "id": "rail-solid_l15",
        "type": "line",
        "source": "china_l15",
        "source-layer": "gis_osm_railways_free_1_l15",
        "minzoom": 13,
        "maxzoom": 16,
        "filter": [
          "in",
          "fclass",
          "rail"
        ],
        "paint": {
          "line-width": 2.4,
          "line-color": "#949494"
        }
      },

      // 铁路（虚线）
      {
        "id": "rail-dash",
        "type": "line",
        "source": "china",
        "source-layer": "gis_osm_railways_free_1",
        "minzoom": 16,
        "filter": [
          "in",
          "fclass",
          "rail"
        ],
        "paint": {
          "line-width": 1.2,
          "line-color": "#fff",
          "line-dasharray": [10, 10]
        }
      },
      // 铁路（虚线）-L15
      {
        "id": "rail-dash_l15",
        "type": "line",
        "source": "china_l15",
        "source-layer": "gis_osm_railways_free_1_l15",
        "minzoom": 13,
        "maxzoom": 16,
        "filter": [
          "in",
          "fclass",
          "rail"
        ],
        "paint": {
          "line-width": 1.2,
          "line-color": "#fff",
          "line-dasharray": [10, 10]
        }
      },

      // 全图道路
      {
        "id": "road_major",
        "type": "line",
        "source": "china_l10",
        "source-layer": "road",
        "minzoom": 4,
        "maxzoom": 8,
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          },
          "line-color": {
            "base": 1,
            "stops": [
              [
                8,
                "hsl(26, 100.00% , 68.04%)"
              ],
              [
                9,
                "hsl(26, 100.00% , 68.04%)"
              ]
            ]
          }
        },
        "interactive": true
      },

      // 全图道路case
      {
        "id": "road-case",
        "type": "line",
        "source": "china_l10",
        "source-layer": "road",
        "minzoom": 4,
        "maxzoom": 8,
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                10,
                1
              ],
              [
                16,
                2
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          }
        },
        "interactive": true
      },

      // 高速方向箭头符号
      {
        "id": "road-oneway-arrows-white",
        "type": "symbol",
        "source": "china",
        "source-layer": "gis_osm_roads_free_1",
        "minzoom": 16,
        "filter": [
          "==",
          "fclass",
          "motorway"
        ],
        "layout": {
          "symbol-placement": "line",
          "icon-image": {
            "base": 1,
            "stops": [
              [
                16,
                "oneway-white-small"
              ],
              [
                17,
                "oneway-white-large"
              ]
            ]
          },
          "icon-padding": 2,
          "symbol-spacing": 200
        },
        "paint": {},
        "interactive": true
      },

      // 高速简称符号
      {
        "id": "road-shields-white",
        "type": "symbol",
        "source": "china",
        "source-layer": "gis_osm_roads_free_1",
        "minzoom": 16,
        "filter": [
          "all",
          ["==", "fclass", "motorway"],
          ["has", "ref"]
        ],
        "layout": {
          "text-size": 9,
          "icon-image": "de-motorway-2",
          "icon-rotation-alignment": "viewport",
          "text-max-angle": 38,
          "symbol-spacing": {
            "base": 1,
            "stops": [
              [
                11,
                150
              ],
              [
                14,
                200
              ]
            ]
          },
          "text-font": [
            "Microsoft YaHei",
          ],
          "symbol-placement": {
            "base": 1,
            "stops": [
              [
                10,
                "point"
              ],
              [
                11,
                "line"
              ]
            ]
          },
          "text-padding": 2,
          "text-rotation-alignment": "viewport",
          "text-field": "{ref}",
          "text-letter-spacing": 0.05,
          "icon-padding": 2
        },
        "paint": {
          "text-color": "hsl(0, 0%, 100%)",
          "icon-halo-color": "rgba(0, 0, 0, 1)",
          "icon-halo-width": 1,
          "text-opacity": 1,
          "icon-color": "white",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0
        },
        "interactive": true
      },
      // 高速简称符号-L15
      {
        "id": "road-shields-white_l15",
        "type": "symbol",
        "source": "china_l15",
        "source-layer": "gis_osm_roads_free_1_l15",
        "minzoom": 13,
        "maxzoom": 16,
        "filter": [
          "all",
          ["==", "fclass", "motorway"],
          ["has", "ref"]
        ],
        "layout": {
          "text-size": 9,
          "icon-image": "de-motorway-2",
          "icon-rotation-alignment": "viewport",
          "text-max-angle": 38,
          "symbol-spacing": {
            "base": 1,
            "stops": [
              [
                11,
                150
              ],
              [
                14,
                200
              ]
            ]
          },
          "text-font": [
            "Microsoft YaHei",
          ],
          "symbol-placement": {
            "base": 1,
            "stops": [
              [
                10,
                "point"
              ],
              [
                11,
                "line"
              ]
            ]
          },
          "text-padding": 2,
          "text-rotation-alignment": "viewport",
          "text-field": "{ref}",
          "text-letter-spacing": 0.05,
          "icon-padding": 2
        },
        "paint": {
          "text-color": "hsl(0, 0%, 100%)",
          "icon-halo-color": "rgba(0, 0, 0, 1)",
          "icon-halo-width": 1,
          "text-opacity": 1,
          "icon-color": "white",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0
        },
        "interactive": true
      },

      // 水系label符号
      {
        "id": "waterway-label",
        "type": "symbol",
        "source": "china",
        "source-layer": "gis_osm_water_a_free_1",
        "minzoom": 16,
        "layout": {
          "text-field": "{name}",
          "text-font": ["Microsoft YaHei"],
          "symbol-placement": "line",
          "text-pitch-alignment": "viewport",
          "text-max-angle": 30,
          "text-size": {
            "base": 1,
            "stops": [
              [
                13,
                12
              ],
              [
                18,
                16
              ]
            ]
          }
        },
        "paint": {
          "text-halo-width": 0.5,
          "text-halo-color": "hsl(196, 80%, 70%)",
          "text-color": "hsl(230, 48%, 44%)",
          "text-halo-blur": 0.5
        },
        "interactive": true
      },
      // 水系label符号-L15
      {
        "id": "waterway-label_l15",
        "type": "symbol",
        "source": "china_l15",
        "source-layer": "gis_osm_water_a_free_1_l15",
        "minzoom": 12,
        "maxzoom": 16,
        "layout": {
          "text-field": "{name}",
          "text-font": ["Microsoft YaHei"],
          "symbol-placement": "line",
          "text-pitch-alignment": "viewport",
          "text-max-angle": 30,
          "text-size": {
            "base": 1,
            "stops": [
              [
                13,
                12
              ],
              [
                18,
                16
              ]
            ]
          }
        },
        "paint": {
          "text-halo-width": 0.5,
          "text-halo-color": "hsl(196, 80%, 70%)",
          "text-color": "hsl(230, 48%, 44%)",
          "text-halo-blur": 0.5
        },
        "interactive": true
      },

      // 主要道路label
      {
        "id": "road-label-main",
        "type": "symbol",
        "source": "china",
        "source-layer": "gis_osm_roads_free_1",
        "minzoom": 16,
        "filter": [
          "in",
          "fclass",
          "motorway",
          "trunk",
        ],
        "layout": {
          "text-size": {
            "base": 1,
            "stops": [
              [
                9,
                12
              ],
              [
                20,
                18
              ]
            ]
          },
          "text-max-angle": 30,
          "symbol-spacing": 250,
          "text-font": [
            "Microsoft YaHei",
          ],
          "symbol-placement": "line",
          "text-padding": 1,
          "text-rotation-alignment": "map",
          "text-pitch-alignment": "viewport",
          "text-field": "{name}",
          "text-letter-spacing": 0.01
        },
        "paint": {
          "text-color": "hsl(0, 0%, 0%)",
          "text-halo-color": "hsla(0, 0%, 100%, 0.75)",
          "text-halo-width": 1,
          "text-halo-blur": 1
        },
        "interactive": true
      },
      // 主要道路label-L15
      {
        "id": "road-label-main_l15",
        "type": "symbol",
        "source": "china_l15",
        "source-layer": "gis_osm_roads_free_1_l15",
        "minzoom": 11,
        "maxzoom": 16,
        "filter": [
          "in",
          "fclass",
          "motorway",
          "trunk",
        ],
        "layout": {
          "text-size": {
            "base": 1,
            "stops": [
              [
                9,
                12
              ],
              [
                20,
                18
              ]
            ]
          },
          "text-max-angle": 30,
          "symbol-spacing": 250,
          "text-font": [
            "Microsoft YaHei",
          ],
          "symbol-placement": "line",
          "text-padding": 1,
          "text-rotation-alignment": "map",
          "text-pitch-alignment": "viewport",
          "text-field": "{name}",
          "text-letter-spacing": 0.01
        },
        "paint": {
          "text-color": "hsl(0, 0%, 0%)",
          "text-halo-color": "hsla(0, 0%, 100%, 0.75)",
          "text-halo-width": 1,
          "text-halo-blur": 1
        },
        "interactive": true
      },
      // 主要道路label-L10
      {
        "id": "road-label-main_l10",
        "type": "symbol",
        "source": "china_l10",
        "source-layer": "gis_osm_roads_free_1_l10",
        "minzoom": 9,
        "maxzoom": 11,
        "filter": [
          "in",
          "fclass",
          "motorway",
          "trunk",
        ],
        "layout": {
          "text-size": {
            "base": 1,
            "stops": [
              [
                9,
                12
              ],
              [
                20,
                18
              ]
            ]
          },
          "text-max-angle": 30,
          "symbol-spacing": 250,
          "text-font": [
            "Microsoft YaHei",
          ],
          "symbol-placement": "line",
          "text-padding": 1,
          "text-rotation-alignment": "map",
          "text-pitch-alignment": "viewport",
          "text-field": "{name}",
          "text-letter-spacing": 0.01
        },
        "paint": {
          "text-color": "hsl(0, 0%, 0%)",
          "text-halo-color": "hsla(0, 0%, 100%, 0.75)",
          "text-halo-width": 1,
          "text-halo-blur": 1
        },
        "interactive": true
      },

      // 二级道路label
      {
        "id": "road-label-primary",
        "type": "symbol",
        "source": "china",
        "source-layer": "gis_osm_roads_free_1",
        "minzoom": 16,
        "filter": [
          "in",
          "fclass",
          "primary",
        ],
        "layout": {
          "text-size": {
            "base": 1,
            "stops": [
              [
                9,
                12
              ],
              [
                20,
                18
              ]
            ]
          },
          "text-max-angle": 30,
          "symbol-spacing": 250,
          "text-font": [
            "Microsoft YaHei",
          ],
          "symbol-placement": "line",
          "text-padding": 1,
          "text-rotation-alignment": "map",
          "text-pitch-alignment": "viewport",
          "text-field": "{name}",
          "text-letter-spacing": 0.01
        },
        "paint": {
          "text-color": "hsl(0, 0%, 0%)",
          "text-halo-color": "hsla(0, 0%, 100%, 0.75)",
          "text-halo-width": 1,
          "text-halo-blur": 1
        },
        "interactive": true
      },
      // 二级道路label-L15
      {
        "id": "road-label-primary_l15",
        "type": "symbol",
        "source": "china_l15",
        "source-layer": "gis_osm_roads_free_1_l15",
        "minzoom": 11,
        "maxzoom": 16,
        "filter": [
          "in",
          "fclass",
          "primary",
        ],
        "layout": {
          "text-size": {
            "base": 1,
            "stops": [
              [
                9,
                12
              ],
              [
                20,
                18
              ]
            ]
          },
          "text-max-angle": 30,
          "symbol-spacing": 250,
          "text-font": [
            "Microsoft YaHei",
          ],
          "symbol-placement": "line",
          "text-padding": 1,
          "text-rotation-alignment": "map",
          "text-pitch-alignment": "viewport",
          "text-field": "{name}",
          "text-letter-spacing": 0.01
        },
        "paint": {
          "text-color": "hsl(0, 0%, 0%)",
          "text-halo-color": "hsla(0, 0%, 100%, 0.75)",
          "text-halo-width": 1,
          "text-halo-blur": 1
        },
        "interactive": true
      },

      // 其他道路label
      {
        "id": "road-label-other",
        "type": "symbol",
        "source": "china",
        "source-layer": "gis_osm_roads_free_1",
        "minzoom": 16,
        "filter": [
          "in",
          "fclass",
          "secondary",
          "tertiary",
          "residential"
        ],
        "layout": {
          "text-size": {
            "base": 1,
            "stops": [
              [
                11,
                10
              ],
              [
                20,
                16
              ]
            ]
          },
          "text-max-angle": 30,
          "symbol-spacing": 250,
          "text-font": [
            "Microsoft YaHei",
          ],
          "symbol-placement": "line",
          "text-padding": 1,
          "text-rotation-alignment": "map",
          "text-pitch-alignment": "viewport",
          "text-field": "{name}",
          "text-letter-spacing": 0.01
        },
        "paint": {
          "text-color": "hsl(0, 0%, 0%)",
          "text-halo-color": "hsla(0, 0%, 100%, 0.75)",
          "text-halo-width": 1,
          "text-halo-blur": 1
        },
        "interactive": true
      },
      // 其他道路label-L15
      {
        "id": "road-label-other_l15",
        "type": "symbol",
        "source": "china_l15",
        "source-layer": "gis_osm_roads_free_1_l15",
        "minzoom": 14,
        "maxzoom": 16,
        "filter": [
          "in",
          "fclass",
          "secondary",
          "tertiary",
          "residential"
        ],
        "layout": {
          "text-size": {
            "base": 1,
            "stops": [
              [
                11,
                10
              ],
              [
                20,
                16
              ]
            ]
          },
          "text-max-angle": 30,
          "symbol-spacing": 250,
          "text-font": [
            "Microsoft YaHei",
          ],
          "symbol-placement": "line",
          "text-padding": 1,
          "text-rotation-alignment": "map",
          "text-pitch-alignment": "viewport",
          "text-field": "{name}",
          "text-letter-spacing": 0.01
        },
        "paint": {
          "text-color": "hsl(0, 0%, 0%)",
          "text-halo-color": "hsla(0, 0%, 100%, 0.75)",
          "text-halo-width": 1,
          "text-halo-blur": 1
        },
        "interactive": true
      },

      // 铁路label
      {
        "id": "rail-label-small",
        "type": "symbol",
        "source": "china",
        "source-layer": "gis_osm_railways_free_1",
        "minzoom": 16,
        "filter": [
          "in",
          "fclass",
          "rail",
          // "subway"
        ],
        "layout": {
          "text-size": {
            "base": 1,
            "stops": [
              [
                13,
                10
              ],
              [
                20,
                16
              ]
            ]
          },
          "text-max-angle": 30,
          "symbol-spacing": 250,
          "text-font": [
            "Microsoft YaHei",
          ],
          "symbol-placement": "line",
          "text-padding": 1,
          "text-rotation-alignment": "map",
          "text-pitch-alignment": "viewport",
          "text-field": "{name}",
          "text-letter-spacing": 0.01
        },
        "paint": {
          "text-color": "hsl(196,53%,8%)",
          "text-halo-color": "hsla(0, 0%, 100%, 0.75)",
          "text-halo-width": 1,
          "text-halo-blur": 1
        },
        "interactive": true
      },
      // 铁路label-L15
      {
        "id": "rail-label-small_l15",
        "type": "symbol",
        "source": "china_l15",
        "source-layer": "gis_osm_railways_free_1_l15",
        "minzoom": 13,
        "maxzoom": 16,
        "filter": [
          "in",
          "fclass",
          "rail",
          // "subway"
        ],
        "layout": {
          "text-size": {
            "base": 1,
            "stops": [
              [
                13,
                10
              ],
              [
                20,
                16
              ]
            ]
          },
          "text-max-angle": 30,
          "symbol-spacing": 250,
          "text-font": [
            "Microsoft YaHei",
          ],
          "symbol-placement": "line",
          "text-padding": 1,
          "text-rotation-alignment": "map",
          "text-pitch-alignment": "viewport",
          "text-field": "{name}",
          "text-letter-spacing": 0.01
        },
        "paint": {
          "text-color": "hsl(196,53%,8%)",
          "text-halo-color": "hsla(0, 0%, 100%, 0.75)",
          "text-halo-width": 1,
          "text-halo-blur": 1
        },
        "interactive": true
      },

      // 墓地符号
      {
        "id": "poi-parks-scalerank2",
        "type": "symbol",
        "source": "china",
        "source-layer": "gis_osm_pofw_free_1",
        "minzoom": 16,
        "layout": {
          "text-line-height": 1.1,
          "text-size": {
            "base": 1,
            "stops": [
              [
                14,
                11
              ],
              [
                20,
                14
              ]
            ]
          },
          "icon-image": {
            "stops": [
              [
                14,
                "cemetery-11"
              ],
              [
                15,
                "cemetery-15"
              ]
            ]
          },
          "text-max-angle": 38,
          "symbol-spacing": 250,
          "text-font": ["Microsoft YaHei"],
          "text-padding": 2,
          "text-offset": [
            0,
            0.65
          ],
          "text-rotation-alignment": "viewport",
          "text-anchor": "top",
          "text-field": "{name}",
          "text-letter-spacing": 0.01,
          "text-max-width": 8
        },
        "paint": {
          "text-color": "hsl(100, 100%, 20%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0.5,
          "text-halo-blur": 0.5
        },
        "interactive": true
      },
      // 墓地符号-L15
      {
        "id": "poi-parks-scalerank2_l15",
        "type": "symbol",
        "source": "china_l15",
        "source-layer": "gis_osm_pofw_free_1_l15",
        "minzoom": 13,
        "maxzoom": 16,
        "layout": {
          "text-line-height": 1.1,
          "text-size": {
            "base": 1,
            "stops": [
              [
                14,
                11
              ],
              [
                20,
                14
              ]
            ]
          },
          "icon-image": {
            "stops": [
              [
                14,
                "cemetery-11"
              ],
              [
                15,
                "cemetery-15"
              ]
            ]
          },
          "text-max-angle": 38,
          "symbol-spacing": 250,
          "text-font": ["Microsoft YaHei"],
          "text-padding": 2,
          "text-offset": [
            0,
            0.65
          ],
          "text-rotation-alignment": "viewport",
          "text-anchor": "top",
          "text-field": "{name}",
          "text-letter-spacing": 0.01,
          "text-max-width": 8
        },
        "paint": {
          "text-color": "hsl(100, 100%, 20%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0.5,
          "text-halo-blur": 0.5
        },
        "interactive": true
      },

      // POI符号1
      {
        "id": "poi-scalerank1",
        "type": "symbol",
        "source": "china",
        "source-layer": "gis_osm_pois_free_1",
        "minzoom": 16,
        "layout": {
          "text-line-height": 1.1,
          "text-size": {
            "base": 1,
            "stops": [
              [
                10,
                11
              ],
              [
                18,
                14
              ]
            ]
          },
          "icon-image": {
            "stops": [
              [
                13,
                "{fclass}-11"
              ],
              [
                14,
                "{fclass}-15"
              ]
            ]
          },
          "text-max-angle": 38,
          "symbol-spacing": 250,
          "text-font": [
            "Microsoft YaHei"
          ],
          "text-padding": 2,
          "text-offset": [
            0,
            0.65
          ],
          "text-rotation-alignment": "viewport",
          "text-anchor": "top",
          "text-field": "{name}",
          "text-letter-spacing": 0.01,
          "text-max-width": 8
        },
        "paint": {
          "text-color": "hsl(26, 25%, 32%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0.5,
          "text-halo-blur": 0.5
        },
        "interactive": true
      },
      // POI符号1-L15
      {
        "id": "poi-scalerank1_l15",
        "type": "symbol",
        "source": "china_l15",
        "source-layer": "gis_osm_pois_free_1_l15",
        "minzoom": 13,
        "maxzoom": 16,
        "layout": {
          "text-line-height": 1.1,
          "text-size": {
            "base": 1,
            "stops": [
              [
                10,
                11
              ],
              [
                18,
                14
              ]
            ]
          },
          "icon-image": {
            "stops": [
              [
                13,
                "{fclass}-11"
              ],
              [
                14,
                "{fclass}-15"
              ]
            ]
          },
          "text-max-angle": 38,
          "symbol-spacing": 250,
          "text-font": [
            "Microsoft YaHei"
          ],
          "text-padding": 2,
          "text-offset": [
            0,
            0.65
          ],
          "text-rotation-alignment": "viewport",
          "text-anchor": "top",
          "text-field": "{name}",
          "text-letter-spacing": 0.01,
          "text-max-width": 8
        },
        "paint": {
          "text-color": "hsl(26, 25%, 32%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0.5,
          "text-halo-blur": 0.5
        },
        "interactive": true
      },

      // POI符号2
      {
        "id": "poi-scalerank2",
        "type": "symbol",
        "source": "china",
        "source-layer": "pois_pt",
        "minzoom": 16,
        "layout": {
          "text-line-height": 1.1,
          "text-size": {
            "base": 1,
            "stops": [
              [
                10,
                11
              ],
              [
                18,
                14
              ]
            ]
          },
          "icon-image": {
            "stops": [
              [
                13,
                "{fclass}-11"
              ],
              [
                14,
                "{fclass}-15"
              ]
            ]
          },
          "text-max-angle": 38,
          "symbol-spacing": 250,
          "text-font": [
            "Microsoft YaHei"
          ],
          "text-padding": 2,
          "text-offset": [
            0,
            0.65
          ],
          "text-rotation-alignment": "viewport",
          "text-anchor": "top",
          "text-field": "{name}",
          "text-letter-spacing": 0.01,
          "text-max-width": 8
        },
        "paint": {
          "text-color": "hsl(26, 25%, 32%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0.5,
          "text-halo-blur": 0.5
        },
        "interactive": true
      },
      // POI符号2-L15
      {
        "id": "poi-scalerank2_l15",
        "type": "symbol",
        "source": "china_l15",
        "source-layer": "pois_pt_l15",
        "minzoom": 13,
        "maxzoom": 16,
        "layout": {
          "text-line-height": 1.1,
          "text-size": {
            "base": 1,
            "stops": [
              [
                10,
                11
              ],
              [
                18,
                14
              ]
            ]
          },
          "icon-image": {
            "stops": [
              [
                13,
                "{fclass}-11"
              ],
              [
                14,
                "{fclass}-15"
              ]
            ]
          },
          "text-max-angle": 38,
          "symbol-spacing": 250,
          "text-font": [
            "Microsoft YaHei"
          ],
          "text-padding": 2,
          "text-offset": [
            0,
            0.65
          ],
          "text-rotation-alignment": "viewport",
          "text-anchor": "top",
          "text-field": "{name}",
          "text-letter-spacing": 0.01,
          "text-max-width": 8
        },
        "paint": {
          "text-color": "hsl(26, 25%, 32%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0.5,
          "text-halo-blur": 0.5
        },
        "interactive": true
      },

      // 机场label
      {
        "id": "airport-label",
        "type": "symbol",
        "source": "china",
        "source-layer": "gis_osm_transport_free_1",
        "minzoom": 16,
        "filter": [
          "==",
          "fclass",
          "airport"
        ],
        "layout": {
          "text-line-height": 1.1,
          "text-size": {
            "base": 1,
            "stops": [
              [
                10,
                12
              ],
              [
                18,
                18
              ]
            ]
          },
          "icon-image": {
            "stops": [
              [
                12,
                "airport-11"
              ],
              [
                13,
                "airport-15"
              ]
            ]
          },
          "symbol-spacing": 250,
          "text-font": [
            "Microsoft YaHei",
          ],
          "text-padding": 2,
          "text-offset": [
            0,
            0.75
          ],
          "text-rotation-alignment": "viewport",
          "text-anchor": "top",
          "text-field": {
            "stops": [
              [
                11,
                "{ref}"
              ],
              [
                12,
                "{name}"
              ]
            ]
          },
          "text-letter-spacing": 0.01,
          "text-max-width": 9
        },
        "paint": {
          "text-color": "hsl(230, 48%, 44%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0.5,
          "text-halo-blur": 0.5
        },
        "interactive": true
      },
      // 机场label-L15
      {
        "id": "airport-label_l15",
        "type": "symbol",
        "source": "china_l15",
        "source-layer": "gis_osm_transport_free_1_l15",
        "minzoom": 13,
        "maxzoom": 16,
        "filter": [
          "==",
          "fclass",
          "airport"
        ],
        "layout": {
          "text-line-height": 1.1,
          "text-size": {
            "base": 1,
            "stops": [
              [
                10,
                12
              ],
              [
                18,
                18
              ]
            ]
          },
          "icon-image": {
            "stops": [
              [
                12,
                "airport-11"
              ],
              [
                13,
                "airport-15"
              ]
            ]
          },
          "symbol-spacing": 250,
          "text-font": [
            "Microsoft YaHei",
          ],
          "text-padding": 2,
          "text-offset": [
            0,
            0.75
          ],
          "text-rotation-alignment": "viewport",
          "text-anchor": "top",
          "text-field": {
            "stops": [
              [
                11,
                "{ref}"
              ],
              [
                12,
                "{name}"
              ]
            ]
          },
          "text-letter-spacing": 0.01,
          "text-max-width": 9
        },
        "paint": {
          "text-color": "hsl(230, 48%, 44%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0.5,
          "text-halo-blur": 0.5
        },
        "interactive": true
      },

      // 各乡镇、村庄、郊区等地名label
      {
        "id": "place-town-village",
        "type": "symbol",
        "source": "china_l10",
        "source-layer": "gis_osm_places_free_1",
        "minzoom": 13,
        "filter": [
          "!=",
          "fclass",
          "city"
        ],
        "layout": {
          "text-field": "{name}",
          "text-font": [
            "Microsoft YaHei",
          ],
          "text-max-width": 7,
          "text-size": {
            "base": 1,
            "stops": [
              [
                13,
                11.5
              ],
              [
                16,
                18
              ]
            ]
          }
        },
        "paint": {
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 1.25,
          "text-color": "hsl(0, 0%, 0%)"
        },
        "interactive": true
      },

      // 各县、乡镇城市label
      {
        "id": "place-city-county",
        "type": "symbol",
        "source": "china_l10",
        "source-layer": "gis_osm_places_free_1",
        "minzoom": 10,
        "filter": [
          "==",
          "fclass",
          "city"
        ],
        "layout": {
          "text-field": "{name}",
          "icon-image": "dot-10",
          "text-anchor": {
            "base": 1,
            "stops": [
              [
                7,
                "top"
              ],
              [
                8,
                "center"
              ]
            ]
          },
          "text-offset": {
            "base": 1,
            "stops": [
              [
                7.99,
                [
                  0,
                  0.1
                ]
              ],
              [
                8,
                [
                  0,
                  0
                ]
              ]
            ]
          },
          "text-font": {
            "base": 1,
            "stops": [
              [
                7,
                [
                  "Microsoft YaHei"
                ]
              ],
              [
                8,
                [
                  "Microsoft YaHei"
                ]
              ]
            ]
          },
          "text-size": {
            "base": 0.9,
            "stops": [
              [
                5,
                12
              ],
              [
                12,
                20
              ]
            ]
          }
        },
        "paint": {
          "text-halo-width": 1,
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-color": "hsl(0, 0%, 0%)",
          "text-halo-blur": 1,
          "icon-opacity": {
            "base": 1,
            "stops": [
              [
                7.99,
                1
              ],
              [
                8,
                0
              ]
            ]
          }
        },
        "interactive": true
      },

      // 全国各市label
      {
        "id": "place-city",
        "type": "symbol",
        "source": "china_l10",
        "source-layer": "citypoint",
        "minzoom": 6,
        "maxzoom": 11,
        "layout": {
          "text-field": "{name}",
          "icon-image": "dot-10",
          "text-anchor": {
            "base": 1,
            "stops": [
              [
                7,
                "top"
              ],
              [
                8,
                "top"
              ]
            ]
          },
          "text-offset": {
            "base": 1,
            "stops": [
              [
                7,
                [
                  0,
                  0.1
                ]
              ],
              [
                8,
                [
                  0,
                  0.1
                ]
              ]
            ]
          },
          "text-font": [
            "Microsoft YaHei"
          ],
          "text-size": {
            "base": 0.9,
            "stops": [
              [
                5,
                12
              ],
              [
                12,
                22
              ]
            ]
          }
        },
        "paint": {
          "text-halo-width": 1,
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-color": "hsl(0, 0%, 0%)",
          "text-halo-blur": 1,
          "icon-opacity": {
            "base": 1,
            "stops": [
              [
                7,
                1
              ],
              [
                8,
                1
              ]
            ]
          }
        },
        "interactive": true
      },

      // 全国各省会城市label
      {
        "id": "place-province",
        "type": "symbol",
        "source": "china_l5",
        "source-layer": "provincepoint",
        "minzoom": 1,
        "maxzoom": 6,
        "layout": {
          "icon-image": "dot-11",
          "text-font": [
            "Microsoft YaHei",
          ],
          "text-offset": {
            "base": 1,
            "stops": [
              [
                7.99,
                [
                  0,
                  0.15
                ]
              ],
              [
                8,
                [
                  0,
                  0
                ]
              ]
            ]
          },
          "text-anchor": {
            "base": 1,
            "stops": [
              [
                7,
                "top"
              ],
              [
                8,
                "center"
              ]
            ]
          },
          "text-field": "{name}",
          "text-max-width": 7,
          "text-size": {
            "base": 0.9,
            "stops": [
              [
                4,
                12
              ],
              [
                10,
                22
              ]
            ]
          }
        },
        "paint": {
          "text-color": "hsl(0, 0%, 0%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 1,
          "icon-opacity": {
            "base": 1,
            "stops": [
              [
                7.99,
                1
              ],
              [
                8,
                0
              ]
            ]
          },
          "text-halo-blur": 1
        },
        "interactive": true
      },

    ],
    "_ssl": true
  },
}