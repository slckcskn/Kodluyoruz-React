
import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'


describe('Başlık/Header Testi',()=>{
    let emojiSearch;
    beforeEach(() =>{
        //App componenti render edilir
        render(<App/>)
        // Sayfa içerisinde Emoji Search yazısı bulunur
        emojiSearch = screen.getByText('Emoji Search');
    })

    test('Başlık render edilmeli',()=>{
        // yazı var mı diye kontrol edilir.
        expect(emojiSearch).toBeInTheDocument();
    })
})

describe('Emoji listesini render testi.',()=>{
  let emojiList;
  beforeEach(() => {
      render(<App/>);
      // json içerisinden ilk 10 item kopyalanır.
      emojiList = [...document.querySelectorAll('.emoji-item')].slice(0, 10);
  })

  test('Başarılı şekilde render edildiği test edilir.',()=> {
      // list içerisinde her item kontol edilir.
      emojiList.map((item)=>{
          expect(screen.getByText(item.title)).toBeInTheDocument();
      })
  })
})

describe('Emoji Filter',()=>{
  beforeEach(() => {
      render(<App/>);
  })

    test("Filtreleme çalışmalı", () => {
    const emoji = "Snowflake";
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: emoji } });

    expect(screen.getByText(emoji)).toBeInTheDocument();
  });
})

describe('Emoji kopyalanmalı',()=>{
  let copyEmoji;

  beforeEach(()=>{
      render(<App/>)
      copyEmoji = screen.getByText('Grinning');
  })

  test('Emoji kopyalanabiliyor mu',()=>{
      // Emojiye tıklandı
      fireEvent.click(copyEmoji);
      // data-clipboard-text 😀 bu değere sahip myi diye kontrol eder
      expect(copyEmoji.parentElement.getAttribute('data-clipboard-text')).toMatch('😀')
  })
})


