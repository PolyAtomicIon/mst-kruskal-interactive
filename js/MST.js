class Graph {
  constructor(vertices) {
    this.Vertices = vertices;
    this.graph = [];
  }

  add_edge(edge) {
    this.graph.push(edge);
  }

  MST() {
    var result = [];

    var n = this.Vertices;
    var m = this.graph.length;

    // # sort edges in ascending order by weight
    this.graph.sort((a, b) => {
      return a.w - b.w;
    });

    var tree_id = [];
    for (var i = 0; i < n; i++) {
      tree_id.push(i);
    }

    var cost = 0;
    for (var i = 0; i < m; i++) {
      const { a, b, w } = this.graph[i];

      if (tree_id[a] != tree_id[b]) {
        cost += w;
        result.push({a, b, w});

        var old_id = tree_id[b];
        var new_id = tree_id[a];

        for (var j = 0; j < n; j++) {
          if (tree_id[j] == old_id) tree_id[j] = new_id;
        }
      }
    }
    return { result, cost };
  }
}
