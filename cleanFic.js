function cleanFic () {
    function hasMedia (el) {
        // var mediaWhitelist = [
        //     'IMG',
        //     'EMBED',
        //     'IFRAME',
        //     'VIDEO'
        // ];

        // var whitelisted = false;

        // mediaWhitelist.forEach(item => {
        //     if (el.tagName === item || el.querySelector(item)) {
        //         whitelisted = true;
        //     };
        // });

        // return whitelisted

        /** Remove media for epub */
        return false
    };

    function naturallyEmpty (el) {
        var emptyWhitelist = [
          'HR'
        ];

        var whitelisted = false;
        var tagName = el.tagName;

        if (tagName === 'BR') {
          return true
        }

        emptyWhitelist.forEach(item => {
          if (tagName === item || el.querySelector(item)) {
              whitelisted = true;
          };
        });

        return whitelisted
    };

    /** Reduce trailing &nbsp;'s */
    function removeWhitespace (el) {
      const iterator = global.window.document.createNodeIterator(el, global.window.NodeFilter.SHOW_TEXT);
      var textNode;

      while (textNode = iterator.nextNode()) {
        textNode.textContent = textNode.textContent.replace(/(\u00A0){2,}$/, '\u00A0');

        /** Fix weird quotation/comma combos */
        textNode.textContent = textNode.textContent.replace('",', ',"');
        textNode.textContent = textNode.textContent.replace('”,', ',”');

        /** Fix ellipses */
        textNode.textContent = textNode.textContent.replace('...', '... ');
      }
    }

    function markSectionBreaks (el) {
      /** Find and mark section breaks */
      // textNode.textContent.match(/^[\*~xX\+\tÀ-ȕ]{2,}$/)
      if (el.textContent.match(/^[!-\/:-@[-`{-~xXÀ-ȕ\t\+]{2,}$/)) {
        el.classList.add("section-break")
      }
    }

    function removeEmptyElement (el) {
      const content = el.textContent && el.textContent.replace(/\u00A0/g, '').trim();

      if (!content) {
          if (hasMedia(el) || naturallyEmpty(el)) {
              return
          }

          el.remove();
          return
      }

      removeWhitespace(el);
    };

    function reduceBrs (userstuff) {
      var el = userstuff.querySelector('br + br + br');

      while (el) {
        el.remove();
        el = userstuff.querySelector('br + br + br');
      }

      el = userstuff.querySelector('br + br');

      while (el) {
        var sibling = el.nextSibling
        var newEl = global.document.createElement('p');
        var newTextNode = global.document.createTextNode(sibling.textContent);
        newEl.appendChild(newTextNode);
        el.after(newEl);

        el.remove();
        sibling.remove();
        el = userstuff.querySelector('br + br');
      }
    }

    function stripTrailingBrs (el) {
      while (el.lastChild && el.lastChild.tagName === 'BR') {
        el.lastChild.remove();
      }
    }

    function stripLeadingBrs (el) {
      while (el.firstChild && el.firstChild.tagName === 'BR') {
        el.firstChild.remove();
      }
    }

    const parent = global.document.querySelectorAll('.userstuff');

    parent.forEach(userstuff => {
        const allowedTags = [
          'a',
          'abbr',
          'acronym',
          'address',
          'b',
          'big',
          'blockquote',
          'caption',
          'center',
          'cite',
          'code',
          'col',
          'colgroup',
          'dd',
          'del',
          'details',
          'dfn',
          'div',
          'dl',
          'dt',
          'em',
          'figcaption',
          'figure',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'i',
          'img',
          'ins',
          'kbd',
          'li',
          'ol',
          'p',
          'pre',
          'q',
          'rp',
          'rt',
          'ruby',
          's',
          'samp',
          'small',
          'span',
          'strike',
          'strong',
          'sub',
          'summary',
          'sup',
          'table',
          'tbody',
          'td',
          'tfoot',
          'th',
          'thead',
          'tr',
          'tt',
          'u',
          'ul',
          'var',
          ':empty'
        ]

        allowedTags.forEach(el => {
          userstuff.querySelectorAll(el).forEach((child) => {
            stripLeadingBrs(child);
            stripTrailingBrs(child);
            removeEmptyElement(child);
          })
        });

        reduceBrs(userstuff);

        allowedTags.forEach(el => {
          userstuff.querySelectorAll(el).forEach((child) => {
            stripLeadingBrs(child);
            stripTrailingBrs(child);
            removeWhitespace(child);
            markSectionBreaks(child);
          })
        });
      });
};

export default cleanFic;