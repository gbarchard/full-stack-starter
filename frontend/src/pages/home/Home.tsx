import {
  Button,
  Card,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
  TextInput,
  theme,
} from 'flowbite-react'
import { useCallback, useEffect, useState } from 'react'
import {
  HomePageDocument,
  HomePageQuery,
  useAddItemMutation,
  useDeleteItemMutation,
  useHomePageQuery,
} from './home.generated'

export default function Home() {
  const { loading, data, error } = useHomePageQuery()
  const [showAddItemModal, setShowAddItemModal] = useState(false)

  if (loading) return <Spinner />

  if (error) return <div>Failed to load items</div>

  return (
    <>
      <AddItemModal
        show={showAddItemModal}
        onClose={() => setShowAddItemModal(false)}
      />
      <header className="flex justify-end mx-4 mt-4">
        <Button onClick={() => setShowAddItemModal(true)}>Add Item</Button>
      </header>
      <section className="m-4 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.items.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </section>
    </>
  )
}

function AddItemModal(props: { show: boolean; onClose: () => void }) {
  const { onClose, show } = props
  const [text, setText] = useState('')

  const [addItem, { loading }] = useAddItemMutation()

  const onSubmit = useCallback(async () => {
    await addItem({
      variables: { addItemInput: { title: text } },
      refetchQueries: [HomePageDocument],
    })
    onClose()
  }, [addItem, onClose, text])

  const keyEvent = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onSubmit()
      }
    },
    [onSubmit],
  )

  useEffect(() => {
    window.addEventListener('keydown', keyEvent)

    return () => window.removeEventListener('keydown', keyEvent)
  })

  return (
    <Modal show={show} onClose={onClose} dismissible>
      <ModalHeader>Add Item</ModalHeader>
      <ModalBody>
        <Label htmlFor="title">Title</Label>
        <TextInput
          id="title"
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
      </ModalBody>
      <ModalFooter>
        <Button color="alternative" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onSubmit} disabled={loading || !text}>
          {loading ? <Spinner /> : 'Submit'}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

function ItemCard(props: { item: HomePageQuery['items'][number] }) {
  const { item } = props

  const [showAddItemModal, setShowAddItemModal] = useState(false)

  return (
    <>
      <Card
        className={theme.card.root.href + ' cursor-pointer'}
        onClick={() => setShowAddItemModal(true)}
      >
        {item.title}
      </Card>
      <DeleteItemConfirmationModal
        itemId={item._id}
        onClose={() => setShowAddItemModal(false)}
        show={showAddItemModal}
      />
    </>
  )
}

function DeleteItemConfirmationModal(props: {
  show: boolean
  onClose: () => void
  itemId: string
}) {
  const { itemId, onClose, show } = props

  const [deleteItemMutation, { loading }] = useDeleteItemMutation()
  const deleteItem = useCallback(async () => {
    await deleteItemMutation({
      variables: { itemId },
      refetchQueries: [HomePageDocument],
    })
    onClose()
  }, [deleteItemMutation, itemId, onClose])

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>Delete Item?</ModalHeader>
      <ModalBody>Are you sure you want to delete this item?</ModalBody>
      <ModalFooter>
        <Button color="alternative" onClick={onClose}>
          Cancel
        </Button>
        <Button color="red" disabled={loading} onClick={deleteItem}>
          {loading ? <Spinner color="gray" /> : 'Delete'}
        </Button>
      </ModalFooter>
    </Modal>
  )
}
