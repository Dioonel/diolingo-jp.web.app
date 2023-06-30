import { Component, OnInit } from '@angular/core';
import { Kana } from 'src/app/models/kana';

@Component({
  selector: 'app-katakana',
  templateUrl: './katakana.component.html',
  styleUrls: ['./katakana.component.css']
})
export class KatakanaComponent implements OnInit {
  katakanas: Kana[][] = [
    [
      { kana: "ア", latin: "a" },
      { kana: "イ", latin: "i" },
      { kana: "ウ", latin: "u" },
      { kana: "エ", latin: "e" },
      { kana: "オ", latin: "o" }
    ], [
      { kana: "カ", latin: "ka" },
      { kana: "キ", latin: "ki" },
      { kana: "ク", latin: "ku" },
      { kana: "ケ", latin: "ke" },
      { kana: "コ", latin: "ko" }
    ], [
      { kana: "サ", latin: "sa" },
      { kana: "シ", latin: "shi" },
      { kana: "ス", latin: "su" },
      { kana: "セ", latin: "se" },
      { kana: "ソ", latin: "so" }
    ], [
      { kana: "タ", latin: "ta" },
      { kana: "チ", latin: "chi" },
      { kana: "ツ", latin: "tsu" },
      { kana: "テ", latin: "te" },
      { kana: "ト", latin: "to" }
    ], [
      { kana: "ナ", latin: "na" },
      { kana: "ニ", latin: "ni" },
      { kana: "ヌ", latin: "nu" },
      { kana: "ネ", latin: "ne" },
      { kana: "ノ", latin: "no" }
    ], [
      { kana: "ハ", latin: "ha" },
      { kana: "ヒ", latin: "hi" },
      { kana: "フ", latin: "fu" },
      { kana: "ヘ", latin: "he" },
      { kana: "ホ", latin: "ho" }
    ], [
      { kana: "マ", latin: "ma" },
      { kana: "ミ", latin: "mi" },
      { kana: "ム", latin: "mu" },
      { kana: "メ", latin: "me" },
      { kana: "モ", latin: "mo" }
    ], [
      { kana: "ヤ", latin: "ya" },
      { kana: "", latin: "" },
      { kana: "ユ", latin: "yu" },
      { kana: "", latin: "" },
      { kana: "ヨ", latin: "yo" }
    ], [
      { kana: "ラ", latin: "ra" },
      { kana: "リ", latin: "ri" },
      { kana: "ル", latin: "ru" },
      { kana: "レ", latin: "re" },
      { kana: "ロ", latin: "ro" }
    ], [
      { kana: "ワ", latin: "wa" },
      { kana: "", latin: "" },
      { kana: "ン", latin: "n" },
      { kana: "", latin: "" },
      { kana: "ヲ", latin: "wo" }
    ]
  ];

  handakuten: Kana[] = [
    { kana: "パ", latin: "pa" },
    { kana: "ピ", latin: "pi" },
    { kana: "プ", latin: "pu" },
    { kana: "ペ", latin: "pe" },
    { kana: "ポ", latin: "po" },
  ];

  dakuten: Kana[][] = [
    [
      { kana: "バ", latin: "ba" },
      { kana: "ビ", latin: "bi" },
      { kana: "ブ", latin: "bu" },
      { kana: "ベ", latin: "be" },
      { kana: "ボ", latin: "bo" },
    ], [
      { kana: "ダ", latin: "da" },
      { kana: "ヂ", latin: "ji" },
      { kana: "ヅ", latin: "zu" },
      { kana: "デ", latin: "de" },
      { kana: "ド", latin: "do" },
    ], [
      { kana: "ザ", latin: "za" },
      { kana: "ジ", latin: "ji" },
      { kana: "ズ", latin: "zu" },
      { kana: "ゼ", latin: "ze" },
      { kana: "ゾ", latin: "zo" },
    ], [
      { kana: "ガ", latin: "ga" },
      { kana: "ギ", latin: "gi" },
      { kana: "グ", latin: "gu" },
      { kana: "ゲ", latin: "ge" },
      { kana: "ゴ", latin: "go" },
    ]
  ];

  combinations: Kana[][] = [
    [
      { kana: "ニャ", latin: "nya" },
      { kana: "ニュ", latin: "nyu" },
      { kana: "ニョ", latin: "nyo" }
    ], [
      { kana: "チャ", latin: "cha" },
      { kana: "チュ", latin: "chu" },
      { kana: "チョ", latin: "cho" },
    ], [
      { kana: "シャ", latin: "sha" },
      { kana: "シュ", latin: "shu" },
      { kana: "ショ", latin: "sho" },
    ], [
      { kana: "キャ", latin: "kya" },
      { kana: "キュ", latin: "kyu" },
      { kana: "キョ", latin: "kyo" },
    ], [
      { kana: "ギャ", latin: "gya" },
      { kana: "ギュ", latin: "gyu" },
      { kana: "ギョ", latin: "gyo" },
    ], [
      { kana: "リャ", latin: "rya" },
      { kana: "リュ", latin: "ryu" },
      { kana: "リョ", latin: "ryo" },
    ], [
      { kana: "ミャ", latin: "mya" },
      { kana: "ミュ", latin: "myu" },
      { kana: "ミョ", latin: "myo" },
    ], [
      { kana: "ヒャ", latin: "hya" },
      { kana: "ヒュ", latin: "hyu" },
      { kana: "ヒョ", latin: "hyo" },
    ], [
      { kana: "ピャ", latin: "pya" },
      { kana: "ピュ", latin: "pyu" },
      { kana: "ピョ", latin: "pyo" },
    ], [
      { kana: "ビャ", latin: "bya" },
      { kana: "ビュ", latin: "byu" },
      { kana: "ビョ", latin: "byo" },
    ], [
      { kana: "ヂャ", latin: "ja" },
      { kana: "ヂュ", latin: "ju" },
      { kana: "ヂョ", latin: "jo" },
    ], [
      { kana: "ジャ", latin: "ja" },
      { kana: "ジュ", latin: "ju" },
      { kana: "ジョ", latin: "jo" },
    ]
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
