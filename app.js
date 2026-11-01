// Modul HRA – hráčska aplikácia QR Questu
// ------------------------------------------------------------------
// Spoločné funkcie (načítanie questu, postup hráča, adresy) sú v shared/v1/qrq.js.
// Formát dát: https://github.com/gagls-qr-quest/gagls-qr-quest.github.io/blob/main/FORMAT.md
//
// Vyskúšaj:  .../hra/                  → úvod questu
//            .../hra/?s=G6A9WP         → naskenované stanovište (Knižnica v ukážke)
//            .../hra/?q=draft          → rozpracovaný quest z editora (neskôr)
// ------------------------------------------------------------------
import { loadQuest, getQuestId, getParam } from 'https://gagls-qr-quest.github.io/shared/v1/qrq.js';

const nazov = document.querySelector('#nazov');
const obsah = document.querySelector('#obsah');

/** Vytvorí odsek s textom. Text vkladáme cez textContent, nie cez innerHTML (bezpečnosť – 12. stretnutie). */
function odsek(text, trieda = '') {
  const p = document.createElement('p');
  p.textContent = text;
  if (trieda) p.className = trieda;
  return p;
}

async function spusti() {
  const questId = getQuestId();
  const kod = getParam('s'); // kód stanovišťa z QR kódu

  try {
    const quest = await loadQuest(questId);
    nazov.textContent = quest.title;

    if (!kod) {
      obsah.replaceChildren(
        odsek(quest.intro),
        odsek('Naskenuj QR kód na stanovišti fotoaparátom v mobile.', 'qrq-muted'),
      );
      return;
    }

    // TODO (úloha z 3. stretnutia): nájdi stanovište podľa kódu v quest.stations
    //   a zobraz jeho názov a otázku. Pri neznámom kóde zobraz „Tento QR kód nepoznám“.
    obsah.replaceChildren(
      odsek(`Naskenovaný kód: ${kod}`),
      odsek('Tu sa čoskoro zobrazí úloha.', 'qrq-muted'),
    );
  } catch (chyba) {
    obsah.replaceChildren(odsek(chyba.message, 'qrq-error'));
    console.error(chyba);
  }
}

spusti();
