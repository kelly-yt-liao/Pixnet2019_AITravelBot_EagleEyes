<template>
  <v-container>
    <v-layout row wrap class="mt-4">
      <v-flex md12>
        <v-tabs v-model="activeDate" grow>
          <v-tab v-for="item in strokeDates" :key="item" ripple dark class="eWhite">{{ item }}</v-tab>

          <v-tab-item v-for="item in strokeDates" :key="item" class="mt-4">
            <v-layout row wrap></v-layout>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex md12>
        <v-stepper v-model="e1">
          <v-stepper-header>
            <template v-for="n in steps">
              <v-stepper-step :key="`${n}-step`" :step="n" editable color="eOrange">Step {{ n }}</v-stepper-step>

              <v-divider v-if="n !== steps" :key="n"></v-divider>
            </template>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content v-for="n in steps" :key="`${n}-content`" :step="n">
              <v-card>
                <v-layout row wrap>
                  <v-flex md6 pa-2>
                    <v-img height="250px" :src="currentPoint(n).src"></v-img>
                  </v-flex>
                  <v-flex md6 pa-2>
                    <v-textarea
                      name="mark"
                      cols="50"
                      rows="12"
                      label="備註"
                      :value="mark"
                      color="eBlue darken-1"
                    ></v-textarea>
                  </v-flex>

                  <v-flex md6 pa-2>
                    <v-layout column>
                      <v-flex md3 class="text-md-center">
                        <h3 class="subheading" color="eDark--text">景點介紹</h3>
                        <p>{{ currentPoint(n).title }}</p>
                      </v-flex>
                      <v-flex md3 class="text-md-center">
                        <h3 class="subheading" color="eDark--text">景點資訊</h3>
                        <p>{{currentPoint(n).title}}</p>
                      </v-flex>
                    </v-layout>
                  </v-flex>

                  <v-flex md6 pa-2>
                    <iframe
                      width="100%"
                      height="100%"
                      frameborder="0"
                      scrolling="no"
                      marginheight="0"
                      marginwidth="0"
                      src="https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=台北市新生南路三段90號&z=16&output=embed&t="
                    ></iframe>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import { isUndefined } from "util";
import { getDateDiff } from "../js/dateFuns";

export default {
  props: ["selectTravel", "date_S", "date_E"],
  data() {
    return {
      strokeDates: getDateDiff(this.date_S, this.date_E),
      strokes: {
        "2019-08-25": [
          {
            title: "台東",
            src:
              "https://pic.pimg.tw/may1215may/1530409630-1869971998_n.jpg?v=1530409698"
          },
          {
            title: "台北",
            src:
              "https://pic.pimg.tw/may1215may/1530409630-1869971998_n.jpg?v=1530409698"
          },
          {
            title: "新竹",
            src:
              "https://pic.pimg.tw/may1215may/1530409630-1869971998_n.jpg?v=1530409698"
          }
        ],
        "2019-08-26": [
          {
            title: "台東",
            src:
              "https://pic.pimg.tw/may1215may/1530409630-1869971998_n.jpg?v=1530409698"
          },
          {
            title: "台北",
            src:
              "https://pic.pimg.tw/may1215may/1530409630-1869971998_n.jpg?v=1530409698"
          },
          {
            title: "新竹",
            src:
              "https://pic.pimg.tw/may1215may/1530409630-1869971998_n.jpg?v=1530409698"
          }
        ],
        "2019-08-27": [
          {
            title: "台東",
            src:
              "https://pic.pimg.tw/may1215may/1530409630-1869971998_n.jpg?v=1530409698"
          },
          {
            title: "台北",
            src:
              "https://pic.pimg.tw/may1215may/1530409630-1869971998_n.jpg?v=1530409698"
          },
          {
            title: "新竹",
            src:
              "https://pic.pimg.tw/may1215may/1530409630-1869971998_n.jpg?v=1530409698"
          }
        ],
        "2019-08-28": [
          {
            title: "台東",
            src:
              "https://pic.pimg.tw/may1215may/1530409630-1869971998_n.jpg?v=1530409698"
          },
          {
            title: "台北",
            src:
              "https://pic.pimg.tw/may1215may/1530409630-1869971998_n.jpg?v=1530409698"
          },
          {
            title: "新竹",
            src:
              "https://pic.pimg.tw/may1215may/1530409630-1869971998_n.jpg?v=1530409698"
          }
        ],
        "2019-08-29": [
          {
            title: "台東",
            src:
              "https://pic.pimg.tw/may1215may/1530409630-1869971998_n.jpg?v=1530409698"
          },
          {
            title: "台北",
            src:
              "https://pic.pimg.tw/may1215may/1530409630-1869971998_n.jpg?v=1530409698"
          },
          {
            title: "新竹",
            src:
              "https://pic.pimg.tw/may1215may/1530409630-1869971998_n.jpg?v=1530409698"
          }
        ],
        "2019-08-30": [
          {
            title: "台東",
            src:
              "https://pic.pimg.tw/may1215may/1530409630-1869971998_n.jpg?v=1530409698"
          },
          {
            title: "台北",
            src:
              "https://pic.pimg.tw/may1215may/1530409630-1869971998_n.jpg?v=1530409698"
          },
          {
            title: "新竹",
            src:
              "https://pic.pimg.tw/may1215may/1530409630-1869971998_n.jpg?v=1530409698"
          }
        ],
        "2019-08-31": [
          {
            title: "新竹",
            src:
              "https://pic.pimg.tw/may1215may/1530409630-1869971998_n.jpg?v=1530409698"
          },
          {
            title: "桃園",
            src:
              "https://pic.pimg.tw/may1215may/1530409630-1869971998_n.jpg?v=1530409698"
          }
        ]
      },
      activeDate: 0,
      e1: 0,
      mark: "大吃特吃"
    };
  },
  computed: {
    steps() {
      let currentDate = this.strokeDates[this.activeDate];
      if (isUndefined(this.strokes[currentDate])) {
        // eslint-disable-next-line
        this.e1 = 0;
        return 0;
      } else {
        // eslint-disable-next-line
        this.e1 = 1;
        return [...this.strokes[currentDate]].length;
      }
    }
  },
  methods: {
    currentPoint(index) {
      let currentDate = this.strokeDates[this.activeDate];
      return this.strokes[currentDate][index - 1];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
