let start = 0
$(document).ready(() => {
    pokedex();

    $('#btn').click(() => {
        pokedex()
    })

})

let pokedex = () => {
    $.ajax(`https://pokeapi.co/api/v2/pokemon/?offset=${start}&limit=20`)
    .done((data) => {
        $.each(data.results, (key, value) => {
            $.ajax(`${value.url}`)
            .done((data) => {

                let habilities = []
                let moves = []
                let pok_moves = data.moves.slice(0,5)

                $.each(data.habilities, (k, v) => {
                    let pok_habilities = v.hability.name
                    habilities.push(pok_habilities)
                })
                $.each(pok_moves, (k,v) => {
                    moves.push(v.move.name)
                })

                $('#pokemones').append(`<div class="card "><img class="card-img-top w-25 h-25 " src="${data.sprites.front_default}" alt="Card image cap"><div class="card-body  font-weight-bold"><p>${data.name}</p><button type="button" id="btn-pok" class="btn btn-success mx-3" data-toggle="modal" data-target="#pokeModal" data-name="${data.name}" data-type="${data.types[0].type.name}" data-habilities="${habilities}" data-moves="${moves}">¡Quiero saber más de este Pokemon!</button>`)

              $.ajax(data.types[0].type.url)
              .done((data => {
                      let generation_pok = data.generation.name
                      $('#btn-pok').attr('data-generation', `${generation_pok}`)
                  }))
          })

      })
      start += 20
  })

}

$('#pokeModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget)
  var pokemon = button.data('name')
  var type = button.data('type')
  var generation = button.data('generation')
  var habilities = button.data('habilities')
  var moves = button.data('moves')
  var modal = $(this)
  modal.find('.modal-title').text(pokemon)
  modal.find('.type').text(type)
  modal.find('.generations').text(generation)
  modal.find('.habilities').text(habilities)
  modal.find('.moves').text(moves)
})
