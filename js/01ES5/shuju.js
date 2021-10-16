class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}


// push  arr[1] = 10 indexOf
class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // 往最后添加元素
    append(element) {
            let node = new Node(element);

            if (this.head === null) {
                this.head = node;
            } else {
                let current = this.getNode(this.size - 1);
                current.next = node;
            }
            this.size++;
        }
        // 插入元素;
    appendAt(position, element) {
        if (position < 0 || position > this.size) {
            throw new Error('out range');
        }

        let node = new Node(element);
        if (position === 0) {
            node.next = this.head;
            this.head = node;
        } else {
            let pre = this.getNode(position - 1);
            node.next = pre.next
            pre.next = node;
        }
        this.size++;
    }

    // indexOf 查找;
    indexOf(element) {
        let current = this.head;
        for (var i = 0; i < this.size; i++) {
            if (current.element === element) {
                return i;
            }
            current = current.next;
        }
        return -1;
    }

    // 删除;
    removeAt(position) {
        if (position < 0 || position >= this.size) {
            throw new Error('out range');
        }
        let current = this.head;
        if (position === 0) {
            this.head = current.next;
        } else {
            let pre = this.getNode(position - 1);
            current = pre.next;
            pre.next = current.next;
        }
        this.size--;
    }

    // 反转;
    reverse() {
        const reverse = head => {
            if (head === null || head.next === null) return head;

            let current = reverse(head.next);
            // console.log(current);
            head.next.next = head;
            head.next = null;
            return current;
        }

        this.head = reverse(this.head);
        return this.head;
        // 非递归;
        // if (this.head === null || this.head.next === null) return this.head;

        // let head = this.head;
        // let newHead = null;

        // while (head != null) {
        //   let temp = head.next; // 保存B;
        //   head.next = newHead; // A => null;
        //   newHead = head; // newHead => A
        //   head = temp; // 原来的头=> B;
        // }

        // this.head = newHead;
        // return this.head;
    }

    getNode(index) {
        if (index < 0 || index >= this.size) {
            throw new Error('out range');
        }
        let current = this.head;
        for (var i = 0; i < index; i++) {
            current = current.next;
        }

        return current;
    }
}

let ll = new LinkedList();
ll.append(1);
ll.append(2);
ll.appendAt(2, 3)
ll.appendAt(3, 4)

// ll.append(3);
// ll.append(4);
// ll.appendAt(4, 5);
// ll.removeAt(4);

// console.log(ll.indexOf(4));
console.dir(ll.reverse(), {
    depth: 100
})

console.dir(ll, {
    depth: 100
});