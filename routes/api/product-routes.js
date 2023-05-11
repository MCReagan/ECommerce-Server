const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
// find all products
// be sure to include its associated Category and Tag data
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
// find a single product by its `id`
// be sure to include its associated Category and Tag data
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  try {
    const productData = await Product.create({

    })

    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      return ProductTag.bulkCreate(productTagIdArr);
    }
    res.status(200).json(productData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// update product
router.put('/:id', async (req, res) => {
  // update product data
    await ProductTag.findAll({ where: { product_id: req.params.id } }); router.put('/:id', async (req, res) => {
      // update product data
      try {
        const productTags = await Product.update(req.body, {
          where: {
            id: req.params.id,
          },
        });

        if (!productTags) {
          res.status(404).json({ message: 'No product with this id!' });
          return;
        }

        await ProductTag.findAll({ where: { product_id: req.params.id } });

        const productTagIds = await productTags.map(({ tag_id }) => tag_id);

        const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });

        const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);

        await Promise.all([
          await ProductTag.destroy({ where: { id: productTagsToRemove } }),
          await ProductTag.bulkCreate(newProductTags),
        ]);

        res.json(updatedProductTags)
      } catch (err) {
        res.status(400).json(err);
      }
    });
});

// delete one product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const productData = await product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!productData) {
      res.status(404).json({ message: 'No product with this id!' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
