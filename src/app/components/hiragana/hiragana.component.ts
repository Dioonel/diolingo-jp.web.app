import { Component, OnInit } from '@angular/core';
import { Kana } from 'src/app/models/kana';

@Component({
  selector: 'app-hiragana',
  templateUrl: './hiragana.component.html',
  styleUrls: ['./hiragana.component.css']
})
export class HiraganaComponent implements OnInit {
  hiraganas: Kana[][] = [
    [
      { kana: "あ", latin: "a" },
      { kana: "い", latin: "i" },
      { kana: "う", latin: "u" },
      { kana: "え", latin: "e" },
      { kana: "お", latin: "o" }
    ], [
      { kana: "か", latin: "ka" },
      { kana: "き", latin: "ki" },
      { kana: "く", latin: "ku" },
      { kana: "け", latin: "ke" },
      { kana: "こ", latin: "ko" }
    ], [
      { kana: "さ", latin: "sa" },
      { kana: "し", latin: "shi" },
      { kana: "す", latin: "su" },
      { kana: "せ", latin: "se" },
      { kana: "そ", latin: "so" }
    ], [
      { kana: "た", latin: "ta" },
      { kana: "ち", latin: "chi" },
      { kana: "つ", latin: "tsu" },
      { kana: "て", latin: "te" },
      { kana: "と", latin: "to" }
    ], [
      { kana: "な", latin: "na" },
      { kana: "に", latin: "ni" },
      { kana: "ぬ", latin: "nu" },
      { kana: "ね", latin: "ne" },
      { kana: "の", latin: "no" }
    ], [
      { kana: "は", latin: "ha" },
      { kana: "ひ", latin: "hi" },
      { kana: "ふ", latin: "fu" },
      { kana: "へ", latin: "he" },
      { kana: "ほ", latin: "ho" }
    ], [
      { kana: "ま", latin: "ma" },
      { kana: "み", latin: "mi" },
      { kana: "む", latin: "mu" },
      { kana: "め", latin: "me" },
      { kana: "も", latin: "mo" }
    ], [
      { kana: "や", latin: "ya" },
      { kana: "", latin: "" },
      { kana: "ゆ", latin: "yu" },
      { kana: "", latin: "" },
      { kana: "よ", latin: "yo" }
    ], [
      { kana: "ら", latin: "ra" },
      { kana: "り", latin: "ri" },
      { kana: "る", latin: "ru" },
      { kana: "れ", latin: "re" },
      { kana: "ろ", latin: "ro" }
    ], [
      { kana: "わ", latin: "wa" },
      { kana: "", latin: "" },
      { kana: "ん", latin: "n" },
      { kana: "", latin: "" },
      { kana: "を", latin: "wo" }
    ]
  ];

  handakuten: Kana[] = [
    { kana: "ぱ", latin: "pa" },
    { kana: "ぴ", latin: "pi" },
    { kana: "ぷ", latin: "pu" },
    { kana: "ぺ", latin: "pe" },
    { kana: "ぽ", latin: "po" },
  ];

  dakuten: Kana[][] = [
    [
      { kana: "ば", latin: "ba" },
      { kana: "び", latin: "bi" },
      { kana: "ぶ", latin: "bu" },
      { kana: "べ", latin: "be" },
      { kana: "ぼ", latin: "bo" },
    ], [
      { kana: "だ", latin: "da" },
      { kana: "ぢ", latin: "ji" },
      { kana: "づ", latin: "zu" },
      { kana: "で", latin: "de" },
      { kana: "ど", latin: "do" },
    ], [
      { kana: "ざ", latin: "za" },
      { kana: "じ", latin: "ji" },
      { kana: "ず", latin: "zu" },
      { kana: "ぜ", latin: "ze" },
      { kana: "ぞ", latin: "zo" },
    ], [
      { kana: "が", latin: "ga" },
      { kana: "ぎ", latin: "gi" },
      { kana: "ぐ", latin: "gu" },
      { kana: "げ", latin: "ge" },
      { kana: "ご", latin: "go" },
    ]
  ];

  combinations: Kana[][] = [
    [
      { kana: "にゃ", latin: "nya" },
      { kana: "にゅ", latin: "nyu" },
      { kana: "にょ", latin: "nyo" }
    ], [
      { kana: "ちゃ", latin: "cha" },
      { kana: "ちゅ", latin: "chu" },
      { kana: "ちょ", latin: "cho" },
    ], [
      { kana: "しゃ", latin: "sha" },
      { kana: "しゅ", latin: "shu" },
      { kana: "しょ", latin: "sho" },
    ], [
      { kana: "きゃ", latin: "kya" },
      { kana: "きゅ", latin: "kyu" },
      { kana: "きょ", latin: "kyo" },
    ], [
      { kana: "ぎゃ", latin: "gya" },
      { kana: "ぎゅ", latin: "gyu" },
      { kana: "ぎょ", latin: "gyo" },
    ], [
      { kana: "りゃ", latin: "rya" },
      { kana: "りゅ", latin: "ryu" },
      { kana: "りょ", latin: "ryo" },
    ], [
      { kana: "みゃ", latin: "mya" },
      { kana: "みゅ", latin: "myu" },
      { kana: "みょ", latin: "myo" },
    ], [
      { kana: "ひゃ", latin: "hya" },
      { kana: "ひゅ", latin: "hyu" },
      { kana: "ひょ", latin: "hyo" },
    ], [
      { kana: "ぴゃ", latin: "pya" },
      { kana: "ぴゅ", latin: "pyu" },
      { kana: "ぴょ", latin: "pyo" },
    ], [
      { kana: "びゃ", latin: "bya" },
      { kana: "びゅ", latin: "byu" },
      { kana: "びょ", latin: "byo" },
    ], [
      { kana: "ぢゃ", latin: "ja" },
      { kana: "ぢゅ", latin: "ju" },
      { kana: "ぢょ", latin: "jo" },
    ], [
      { kana: "じゃ", latin: "ja" },
      { kana: "じゅ", latin: "ju" },
      { kana: "じょ", latin: "jo" },
    ]
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
