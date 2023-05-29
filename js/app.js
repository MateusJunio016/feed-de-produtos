$(document).ready(function () {
  $('#exibirFeedBtn').click(function () {
    $.ajax({
      url: 'feed_psel.xml',
      dataType: 'xml',
      success: function (data) {
        var items = $(data).find('item');

        // Limpa o conteúdo atual do feed antes de adicionar novos itens
        $('#productFeed').empty();

        // Loop pelos itens do XML e cria as tags dinamicamente
        items.each(function () {
          var id = $(this).find('id').text();
          var title = $(this).find('title').text();
          var price = $(this).find('price').text();
          var link = $(this).find('link').text();
          var imageLink = $(this).find('image_link').text();
          var productType = $(this).find('product_type').text();

          var itemTag = $('<div class="descricao p-1" data-id="' + id + '">' +
            '<p class="text-truncate">' + id + '</p>' +
            '<b><p>' + title + '</p></b>' +
            '<p>' + price + '</p>' +
            '<p>' + link + '</p>' +
            '<p>' + imageLink + '</p>' +
            '<p>' + productType + '</p>' +
            '</div>');

          $('#productFeed').append(itemTag);
        });

        // Exibe o botão "Corrigir"
        $('#corrigirBtn').show();
        $('#recolherFeedBtn').show();
        $('#productFeed').show();
      }
    });
  });

  function corrigirImageLink(id) {
    $.ajax({
      url: 'feed_psel.xml',
      dataType: 'xml',
      success: function (data) {
        var items = $(data).find('item');

        items.each(function () {
          var itemId = $(this).find('id').text();

          // Verifica se o ID corresponde ao ID do item que deseja corrigir o image_link
          if (itemId === id) {
            var item = $('[data-id="' + id + '"]');
            var imageLink = $(this).find('image_link').text();

            var link = $(this).find('link').text();
            var linkParts = link.split("/"); // Divide o link em partes separadas pela barra
            var lastPart = linkParts.pop(); // Remove o último elemento (no caso, "jaqueta-couro")
            var linkName = lastPart.substring(0, lastPart.length - 1); // Remove as aspas do resultado

            var linkRegex = /^(.+)\/[^\/]+$/;

            var correctedImageLink = imageLink.replace(linkRegex, '$1/' + linkName + '.jpg');

            if (correctedImageLink !== imageLink) {
              item.find('p:nth-child(5)').text(correctedImageLink);
              console.log('Image link corrigido com sucesso para o item com ID: ' + id);
            } else {
              console.log('Image link já possui a extensão correta para o item com ID: ' + id);
            }
          }
        });
      }
    });
  }


  function removerItemPorId(id) {
    $.ajax({
      url: 'feed_psel.xml',
      dataType: 'xml',
      success: function (data) {
        var items = $(data).find('item');

        items.each(function () {
          var itemId = $(this).find('id').text();

          // Verifica se o ID corresponde ao ID do item que deseja remover
          if (itemId === id) {
            var item = $('[data-id="' + id + '"]');

            if (item.length > 0) {
              item.remove();
              console.log('Item com ID ' + id + ' removido com sucesso.');
            } else {
              console.log('Item com ID ' + id + ' não encontrado.');
            }
          }
        });
      }
    });
  }

  function corrigirPreco() {
    $.ajax({
      url: 'feed_psel.xml',
      dataType: 'xml',
      success: function (data) {
        var items = $(data).find('item');

        $('#productFeed').empty();

        items.each(function () {
          var id = $(this).find('id').text();
          var title = $(this).find('title').text();
          var price = $(this).find('price').text();
          var link = $(this).find('link').text();
          var imageLink = $(this).find('image_link').text();
          var productType = $(this).find('product_type').text();

          // Corrige o formato do preço de BRL para R$
          price = price.replace('BRL', 'R$');

          var itemTag = $('<div class="descricao p-1" data-id="' + id + '">' +
            '<p class="text-truncate">' + id + '</p>' +
            '<b><p>' + title + '</p></b>' +
            '<p>' + price + '</p>' +
            '<p>' + link + '</p>' +
            '<p>' + imageLink + '</p>' +
            '<p>' + productType + '</p>' +
            '</div>');

          $('#productFeed').append(itemTag);
        });

        $('#corrigirBtn').show();
      }
    });
  }

  $(document).ready(function () {
    $('#corrigirBtn').click(function () {
    //Chama todas as funões de correção necessárias ao clicar no botão corrigir
      corrigirPreco();
      corrigirImageLink('106954');
      corrigirImageLink('540178');
      removerItemPorId('403921');
      removerItemPorId('595044');
    });
  });
});

$(document).ready(function() {
  // Manipulador de eventos para o botão "Esconder feed"
  $('#recolherFeedBtn').click(function() {
    $('#productFeed').hide();
    $('#corrigirBtn').hide();
  });
});
