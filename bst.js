let Node = class {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
        this.ant
    }
}

let Tree = class {
    constructor() {
        this.root
    }
    sortedArray(arr) {
        function mergeSots(arr) {
            if (arr.length === 1) return arr
            const mid = arr.length > 2 ? Math.floor(arr.length / 2) : 1
            const left = arr.slice(0, mid)
            const right = arr.slice(mid, arr.length)
            return merge(mergeSots(left), mergeSots(right))
        }
        function merge(arrLeft, arrRight) {
            let sortArr = []
            let iL = 0
            let iR = 0
            while (iL < arrLeft.length && iR < arrRight.length) {
                if (arrLeft[iL] < arrRight[iR]) {
                    sortArr.push(arrLeft[iL])
                    iL++
                } else {
                    sortArr.push(arrRight[iR])
                    iR++
                }
            }
            while (arrLeft.length > iL) {
                sortArr.push(arrLeft[iL])
                iL++
            }
            while (arrRight.length > iR) {
                sortArr.push(arrRight[iR])
                iR++
            }
            return sortArr
        }
        return mergeSots(arr)
    }
    buildTree(arr) {
        if (!arr) throw console.error('ingrese un valor');

        let unique = []
        arr.forEach((element) => {
            if (!unique.includes(element)) {
                unique.push(element)
            }
        })

        unique = this.sortedArray(unique) 

            function recursiveBuildTree(arr, star, end) {
                if (star > end) return null

                let midd = star + Math.floor((end - star) / 2)
                let root = new Node(arr[midd])

                root.left = recursiveBuildTree(arr, star, midd - 1)
                root.right = recursiveBuildTree(arr, midd + 1, end)

                return root
            }

            this.root = recursiveBuildTree(unique, 0, unique.length - 1)
        }
        includes(value) {
            let result = recursiveIncludes(value, this.root) ? true : false
            function recursiveIncludes(value, node) {
                if (!value) throw console.error('ingrese un valor')
                if (!node) return
                console.log(node.value)
                if (node.value === value) return true
                let left = recursiveIncludes(value, node.left)
                if (left) return
                let right = recursiveIncludes(value, node.right)
                if (right) return
            }
            return result
        }
        insert(value) {
            function insertRecursive(value, node) {
                if (value === node.value) return

                if (node.left === null && value < node.value) {
                    return node.left = new Node(value)
                }
                if (node.right === null && value > node.value) {
                    return node.right = new Node(value)
                }

                if (value > node.value) {
                    insertRecursive(value, node.right)
                } if (value < node.value) {
                    insertRecursive(value, node.left)
                }
            }
            insertRecursive(value, this.root)
        }
        deleteItem(value) {
            function deleteRecursive(value, node) {
                if (node === null) return node
                if (value > node.value) {
                    node.right = deleteRecursive(value, node.right)
                    return node
                } if (value < node.value) {
                    node.left = deleteRecursive(value, node.left)
                    return node
                }
                if (value === node.value) {
                    if (node.left && node.right) {
                        let curr = node.right
                        while (curr.left !== null) {
                            curr = curr.left
                        }
                        let rec = node.value
                        node.value = curr.value
                        curr.value = rec
                        node.right = deleteRecursive(curr.value, node.right)
                        return node
                    }
                    if (node.left === null) {
                        node = node.right
                        return node
                    }
                    if (node.right === null) {
                        node = node.left
                        return node
                    }
                }
            }
            this.root = deleteRecursive(value, this.root)
        }
        levelOrderForEach(callback) {
            if (typeof callback !== 'function') {
                throw new Error('param is not a function')
            }
            function readLevel(node, queue) {
                callback(queue[0])
                queue.shift()
                if (node.left !== null) queue.push(node.left)
                if (node.right !== null) queue.push(node.right)
                if (queue.length !== 0) readLevel(queue[0], queue)
                return
            }
            readLevel(this.root, [this.root])
        }
        preOrderForEach(callback) {
            if (typeof callback !== 'function') {
                throw new Error('param is not a function')
            }
            function readPreOrdered(node) {
                callback(node)
                if (node.left !== null) readPreOrdered(node.left)
                if (node.right !== null) readPreOrdered(node.right)
                return
            }
            readPreOrdered(this.root)
        }
        inOrderForEach(callback) {
            if (typeof callback !== 'function') {
                throw new Error('param is not a function')
            }
            function readInOrder(node) {
                if (node === null) return
                readInOrder(node.left)
                callback(node)
                readInOrder(node.right)
            }
            readInOrder(this.root)
        }
        postOrderForEach(callback) {
            if (typeof callback !== 'function') {
                throw new Error('param is not a function')
            }
            function readPostOrdered(node) {
                if (node === null) return
                readPostOrdered(node.right)
                callback(node)
                readPostOrdered(node.left)
            }
            readPostOrdered(this.root)
        }
        height(value) {
            let heightL = 0
            let heightR = 0
            function searchNode(value, node) {
                if (node === null) return
                if (node.value === value) return searchLeaf(node)
                if (value > node.value) searchNode(value, node.right)
                if (value < node.value) searchNode(value, node.left)
            }
            function searchLeaf(node) {
                if (node === null) return
                if (node.left !== null) {
                    heightL++
                    searchLeaf(node.left)
                } if (node.right !== null) {
                    heightR++
                    searchLeaf(node.right)
                }
            }
            searchNode(value, this.root)
            if (heightL > heightR) return heightL
            else return heightR
        }
        depp(value) {
            let deep = 0
            function search(value, node) {
                if (node === null) return
                if (value > node.value) {
                    deep++
                    search(value, node.right)
                } if (value < node.value) {
                    deep++
                    search(value, node.left)
                }
                return deep
            }
            return search(value, this.root)
        }
        isBalanced(node = this.root) {
            let left = this.height(node.left.value)
            let right = this.height(node.right.value)
            let diff = Math.abs(left - right)
            if (diff < 2) return true
            else return false
        }
        rebalance() {
            let rec = []
            if (!this.isBalanced()) {
                this.inOrderForEach((node) => {
                    rec.push(node.value)
                })
                this.buildTree(rec)
                console.log(rec)
                console.log(this.root)
            }
        }
    }



let arr = [1, 5, 6, 9, 14, 23, 27]
// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
let tree = new Tree()
let test = tree.buildTree(arr)


// console.log(tree.sortedArray([1, 4, 3, 2]))

// tree.insert(28)
// tree.insert(29)
// console.log(tree.root)
// console.log(tree.includes(22))
// console.log(tree.root)
// console.log(tree.deleteItem(27))
// console.log(tree.deleteItem(14))
// console.log(tree.deleteItem(5))
// // console.log(tree.root)
// tree.postOrderForEach((node) => {
//     console.log(node.value)
// // })
// console.log(tree.isBalanced())
// tree.rebalance()
// console.log(tree.isBalanced())
// console.log(tree.height(14))


